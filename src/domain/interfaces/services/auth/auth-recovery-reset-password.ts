import { Locals } from '@/application/interfaces';

export interface AuthRecoveryResetPassword {
  run(
    params: AuthRecoveryResetPassword.Params,
  ): Promise<AuthRecoveryResetPassword.Response>;
}

export namespace AuthRecoveryResetPassword {
  export type Params = {
    password: string;
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
