import { Locals } from '@/application/interfaces';

export interface EstablishmentCreate {
  run(
    params: EstablishmentCreate.Params,
  ): Promise<EstablishmentCreate.Response>;
}

export namespace EstablishmentCreate {
  export type Params = {
    name: string;
    phone: string;
    userId: string;
    description?: string;
    logo?: File;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    token: string;
  };
}
