import { getHttpError, ok } from '@/application/helpers';
import { Controller, Http } from '@/application/interfaces';
import {
  Auth,
  AuthRecoveryResetPassword,
  AuthRecoverySendCode,
  AuthRecoveryValidateCode,
  AuthSignIn,
  AuthSignUp,
} from '@/domain/interfaces';

import { UnauthorizedError } from '../errors';

export class AuthController implements Controller {
  constructor(
    private readonly serviceName: Auth.AuthServicesName,
    private readonly service: Auth.AuthServices,
  ) {}

  public async handle({
    data: params,
    locals,
  }: Http.Request<any>): Promise<Http.Response> {
    return this?.[this.serviceName]({ params, locals }).catch((e: any) =>
      getHttpError(e),
    );
  }

  private async authSignUp({
    params,
  }: AuthSignUp.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as AuthSignUp).run({
      ...params,
    });

    return ok({ ...content });
  }

  private async authSignIn({
    params,
  }: AuthSignIn.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as AuthSignIn).run({
      ...params,
    });

    return ok({ ...content });
  }

  private async authRecoverySendCode({
    params,
  }: AuthRecoverySendCode.ParamsService): Promise<Http.Response> {
    const content = await (this.service() as AuthRecoverySendCode).run({
      ...params,
    });

    return ok({ ...content });
  }

  private async authRecoveryValidateCode({
    params,
    locals,
  }: AuthRecoveryValidateCode.ParamsService): Promise<Http.Response> {
    if (!locals.codeValidated || !locals.sub) {
      throw new UnauthorizedError('Access denied.', 20);
    }

    const content = await (this.service() as AuthRecoveryValidateCode).run({
      ...params,
      userId: locals.sub,
    });

    return ok({ ...content });
  }

  private async authRecoveryResetPassword({
    params,
    locals,
  }: AuthRecoveryResetPassword.ParamsService): Promise<Http.Response> {
    if (!locals.codeValidated || !locals.sub) {
      throw new UnauthorizedError('Access denied.', 20);
    }

    const content = await (this.service() as AuthRecoveryResetPassword).run({
      ...params,
      userId: locals.sub,
    });

    return ok({ ...content });
  }
}
