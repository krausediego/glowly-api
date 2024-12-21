import { eq } from 'drizzle-orm';

import { BadRequestError } from '@/application/errors';
import {
  AuthRecoveryResetPassword,
  HashManager,
  IToken,
} from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import { users } from '@/infra/drizzle/schemas';
import env from '@/main/config/environments/token';

export class AuthRecoveryResetPasswordService
  implements AuthRecoveryResetPassword
{
  constructor(
    private readonly token: IToken,
    private readonly hash: HashManager,
  ) {}

  async run(
    params: AuthRecoveryResetPassword.Params,
  ): Promise<AuthRecoveryResetPassword.Response> {
    const { password, userId } = params;

    const user = await drizzle.query.users.findFirst({
      where(fields) {
        return eq(fields.id, userId);
      },
    });

    if (!user) {
      throw new BadRequestError('User not found.', 19);
    }

    const passwordHashed = await this.hash.generateHash(password);

    await drizzle
      .update(users)
      .set({ password: passwordHashed })
      .where(eq(users.id, userId));

    const token = this.token.createToken({
      payload: { sub: user.id },
      secret: env.secretAuth,
      expiresIn: '7d',
    });

    return {
      token,
    };
  }
}
