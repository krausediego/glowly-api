import { eq } from 'drizzle-orm';

import { BadRequestError } from '@/application/errors';
import { AuthSignUp, HashManager, IToken } from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import { profiles, users } from '@/infra/drizzle/schemas';
import env from '@/main/config/environments/token';

export class AuthSignUpService implements AuthSignUp {
  constructor(
    private readonly hashManager: HashManager,
    private readonly token: IToken,
  ) {}

  async run(params: AuthSignUp.Params): Promise<AuthSignUp.Response> {
    const { email, password, customer, ...rest } = params;

    const userExists = await drizzle.query.users.findFirst({
      where(fields) {
        return eq(fields.email, email);
      },
    });

    if (userExists) {
      throw new BadRequestError('User already exists', 11);
    }

    // const profile = await this.profilesRepository.findByPhone(rest.phone);

    // if (profile) {
    //   throw new BadRequestError('User already exist', 12);
    // }

    const passwordHash = await this.hashManager.generateHash(password);

    const { userId } = await drizzle.transaction(async tx => {
      const [profile] = await tx
        .insert(profiles)
        .values({ ...rest })
        .returning({ id: profiles.id });

      const [user] = await tx
        .insert(users)
        .values({
          email,
          password: passwordHash,
          customer,
          profileId: profile.id,
        })
        .returning({ id: users.id });

      return { userId: user.id };
    });

    const token = this.token.createToken({
      payload: { sub: userId },
      secret: env.secretAuth,
      expiresIn: '7d',
    });

    return {
      token,
    };
  }
}
