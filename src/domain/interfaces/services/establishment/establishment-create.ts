import { Locals, MulterFile } from '@/application/interfaces';

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
    categories: string;
    street: string;
    neighborhood: string;
    state: string;
    city: string;
    number: number;
    cep: string;
    description?: string;
    logo?: MulterFile;
  };

  export type ParamsService = {
    params: Params;
    file?: Record<string, any>;
    locals: Locals;
  };

  export type Response = {
    token: string;
  };
}
