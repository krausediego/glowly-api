import { Locals } from '@/application/interfaces';

export interface AuthSignIn {
  run(params: AuthSignIn.Params): Promise<AuthSignIn.Response>;
}

export namespace AuthSignIn {
  export type Params = {
    email: string;
    password: string;
    customer: boolean;
    remember?: boolean;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    token: string;
  };
}
