import { Locals } from '@/application/interfaces';

export interface AuthRecoverySendCode {
  run(
    params: AuthRecoverySendCode.Params,
  ): Promise<AuthRecoverySendCode.Response>;
}

export namespace AuthRecoverySendCode {
  export type Params = {
    email: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    token: string;
  };
}
