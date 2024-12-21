import { IToken } from '@/domain/interfaces';
import env from '@/main/config/environments/token';

import { UnauthorizedError } from '../errors';
import { getHttpError, ok } from '../helpers';
import { Http, Locals, Middleware } from '../interfaces';

export class AuthTokenMiddleware implements Middleware {
  constructor(
    private readonly token: IToken,
    private readonly origin: 'auth' | 'recovery',
  ) {}

  async handle(request: Http.Request): Promise<Http.Response> {
    const { authorization } = request.data;

    try {
      if (!authorization) {
        throw new UnauthorizedError('Authorization header was not provided.');
      }

      const { sub, codeValidated, establishmentId, permissions } =
        this.token.validate({
          token: authorization,
          secret: this.origin === 'auth' ? env.secretAuth : env.secretRecovery,
        }) as Locals;

      if (sub) {
        return ok({
          authenticated: true,
          sub,
          codeValidated,
          establishmentId,
          permissions,
        });
      }

      throw new UnauthorizedError('Access denied.');
    } catch (error: any) {
      return getHttpError(error);
    }
  }
}
