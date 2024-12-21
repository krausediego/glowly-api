import { Locals } from './locals';

export namespace Http {
  export interface Request<Data = any> {
    method: string;
    path: string;
    data: Data;
    locals: Locals;
  }

  export interface Response {
    statusCode: number;
    code?: number;
    body?: any;
  }
}
