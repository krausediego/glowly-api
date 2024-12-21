import { Locals } from '@/application/interfaces';

export interface ReviewCreate {
  run(params: ReviewCreate.Params): Promise<ReviewCreate.Response>;
}

export namespace ReviewCreate {
  export type Params = {
    rating: number;
    userId: string;
    establishmentId: string;
    message?: string;
    anonymous?: boolean;
  };

  export type ParamsService = {
    params: Params;
    locals: Locals;
  };

  export type Response = {
    message: string;
  };
}
