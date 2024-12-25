import { Locals } from '@/application/interfaces';

export interface FavoriteRemove {
  run(params: FavoriteRemove.Params): Promise<FavoriteRemove.Response>;
}

export namespace FavoriteRemove {
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
