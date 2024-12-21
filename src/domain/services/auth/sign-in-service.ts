import { and, eq } from 'drizzle-orm';

import { BadRequestError } from '@/application/errors';
import { AuthSignIn, HashManager, IToken } from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import {
  establishmentSpecialistPermissions,
  permissions,
} from '@/infra/drizzle/schemas';
import env from '@/main/config/environments/token';

export class AuthSignInService implements AuthSignIn {
  constructor(
    private readonly hash: HashManager,
    private readonly token: IToken,
  ) {}

  async run(params: AuthSignIn.Params): Promise<AuthSignIn.Response> {
    const { email, password, customer, remember } = params;

    const expiresIn = remember ? '1y' : '7d';

    const user = await drizzle.query.users.findFirst({
      where(fields) {
        return and(eq(fields.email, email), eq(fields.customer, customer));
      },
    });

    if (!user) {
      throw new BadRequestError('User or password is incorrect', 14);
    }

    if (!user.status) {
      throw new BadRequestError('User is blocked', 15);
    }

    const verifyPassword = await this.hash.compareHash(password, user.password);

    if (!verifyPassword) {
      throw new BadRequestError('User or password is incorrect', 14);
    }

    const establishmentSpecialist =
      await drizzle.query.establishmentSpecialists.findFirst({
        where(fields) {
          return eq(fields.userId, user.id);
        },
      });

    if (!establishmentSpecialist) {
      const token = this.token.createToken({
        payload: { sub: user.id },
        secret: env.secretAuth,
        expiresIn,
      });

      return {
        token,
      };
    }

    const permissionsResult = await drizzle
      .select({
        permission: permissions.slug,
      })
      .from(establishmentSpecialistPermissions)
      .innerJoin(
        permissions,
        eq(permissions.id, establishmentSpecialistPermissions.permissionId),
      )
      .where(
        eq(
          establishmentSpecialistPermissions.establishmentSpecialistId,
          establishmentSpecialist.id,
        ),
      );

    const token = this.token.createToken({
      payload: {
        sub: user.id,
        establishmentId: establishmentSpecialist.establishmentId,
        permissions: permissionsResult.map(({ permission }) => permission),
      },
      secret: env.secretAuth,
      expiresIn,
    });

    return {
      token,
    };
  }
}
