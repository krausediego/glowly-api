import { eq } from 'drizzle-orm';

import { BadRequestError } from '@/application/errors';
import { EstablishmentCreate, IToken } from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import {
  establishments,
  establishmentSpecialistPermissions,
  establishmentSpecialists,
} from '@/infra/drizzle/schemas';
import env from '@/main/config/environments/token';

export class EstablishmentCreateService implements EstablishmentCreate {
  constructor(private readonly token: IToken) {}

  async run(
    params: EstablishmentCreate.Params,
  ): Promise<EstablishmentCreate.Response> {
    const { name, phone, userId, description } = params;

    const establishmentExists = await drizzle.query.establishments.findFirst({
      where(fields) {
        return eq(fields.phone, phone);
      },
    });

    if (establishmentExists) {
      throw new BadRequestError('Establishment phone already exists.', 21);
    }

    const { establishmentId, permissions } = await drizzle.transaction(
      async tx => {
        const [establishment] = await tx
          .insert(establishments)
          .values({ name, phone, description })
          .returning({ id: establishments.id });

        const [establishmentSpecialist] = await tx
          .insert(establishmentSpecialists)
          .values({ userId, establishmentId: establishment.id })
          .returning({ id: establishmentSpecialists.id });

        const permission = await tx.query.permissions.findFirst({
          where(fields) {
            return eq(fields.slug, 'ADMIN');
          },
        });

        if (!permission) {
          throw new BadRequestError('Error in find admin permission', 22);
        }

        await tx.insert(establishmentSpecialistPermissions).values({
          establishmentSpecialistId: establishmentSpecialist.id,
          permissionId: permission.id,
        });

        return { establishmentId: establishment.id, permissions: ['ADMIN'] };
      },
    );

    const token = this.token.createToken({
      payload: {
        sub: userId,
        establishmentId,
        permissions,
      },
      secret: env.secretAuth,
      expiresIn: '7d',
    });

    return {
      token,
    };
  }
}
