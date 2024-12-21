import { Locals } from '@/application/interfaces';

export interface AuthSignUp {
  run(params: AuthSignUp.Params): Promise<AuthSignUp.Response>;
}

export namespace AuthSignUp {
  export type Params = {
    email: string;
    password: string;
    name: string;
    phone: string;
    customer: boolean;
    avatarURL?: string;
    birthDate?: Date;
    gender?: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    token: string;
  };
}
