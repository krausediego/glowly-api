import { Locals } from '@/application/interfaces';

export interface AuthRecoveryValidateCode {
  run(
    params: AuthRecoveryValidateCode.Params,
  ): Promise<AuthRecoveryValidateCode.Response>;
}

export namespace AuthRecoveryValidateCode {
  export type Params = {
    code: string;
    userId: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    token: string;
  };
}
