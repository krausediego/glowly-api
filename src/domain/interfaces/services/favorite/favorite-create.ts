import { Locals } from '@/application/interfaces';

export interface FavoriteCreate {
  run(params: FavoriteCreate.Params): Promise<FavoriteCreate.Response>;
}

export namespace FavoriteCreate {
  export type Params = {
    userId: string;
    establishmentId: string;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    message: string;
  };
}
