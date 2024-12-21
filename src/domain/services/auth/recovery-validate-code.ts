import { eq } from 'drizzle-orm';

import { BadRequestError } from '@/application/errors';
import { AuthRecoveryValidateCode, IToken } from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import { recoveryCodes } from '@/infra/drizzle/schemas';
import env from '@/main/config/environments/token';

export class AuthRecoveryValidateCodeService
  implements AuthRecoveryValidateCode
{
  constructor(private readonly token: IToken) {}

  async run(
    params: AuthRecoveryValidateCode.Params,
  ): Promise<AuthRecoveryValidateCode.Response> {
    const { code, userId } = params;

    const recoveryCodeValidated = await drizzle.query.recoveryCodes.findFirst({
      where(fields) {
        return eq(fields.code, code);
      },
    });

    if (!recoveryCodeValidated) {
      throw new BadRequestError('Code is invalid', 18);
    }

    await drizzle.delete(recoveryCodes).where(eq(recoveryCodes.code, code));

    const token = this.token.createToken({
      payload: { sub: userId, codeValidated: true },
      secret: env.secretRecovery,
      expiresIn: '10m',
    });

    return {
      token,
    };
  }
}
