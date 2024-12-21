import { eq } from 'drizzle-orm';

import { BadRequestError } from '@/application/errors';
import { generateRandomCode } from '@/application/helpers';
import {
  AuthRecoverySendCode,
  IToken,
  NodemailerManager,
} from '@/domain/interfaces';
import { drizzle } from '@/infra/drizzle/drizzle';
import { recoveryCodes } from '@/infra/drizzle/schemas';
import env from '@/main/config/environments/token';

export class AuthRecoverySendCodeService implements AuthRecoverySendCode {
  constructor(
    private readonly token: IToken,
    private readonly nodemailer: NodemailerManager,
  ) {}

  async run(
    props: AuthRecoverySendCode.Params,
  ): Promise<AuthRecoverySendCode.Response> {
    const { email } = props;

    const user = await drizzle.query.users.findFirst({
      where(fields) {
        return eq(fields.email, email);
      },
    });

    if (!user) {
      throw new BadRequestError('User not found', 16);
    }

    const randomCode = generateRandomCode();

    const [recoveryCode] = await drizzle
      .insert(recoveryCodes)
      .values({ userId: user.id, code: randomCode })
      .returning({ code: recoveryCodes.code });

    try {
      await this.nodemailer.sendMail({
        code: recoveryCode.code,
        email: user.email,
      });
    } catch {
      await drizzle
        .delete(recoveryCodes)
        .where(eq(recoveryCodes.code, recoveryCode.code));
      throw new BadRequestError(
        'Error in send code recovery, try again in a moment',
        17,
      );
    }

    const token = this.token.createToken({
      payload: { sub: user.id },
      secret: env.secretRecovery,
      expiresIn: '10m',
    });

    return {
      token,
    };
  }
}
