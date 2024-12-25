import { Locals } from '@/application/interfaces';

export interface EstablishmentFindAll {
  run(
    params: EstablishmentFindAll.Params,
  ): Promise<EstablishmentFindAll.Response>;
}

export namespace EstablishmentFindAll {
  export type Params = {
    userId: string;
    filters?: {
      category: string;
      name: string;
      rate: number;
      // distance: string
    };
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    docs: any[];
  };
}
