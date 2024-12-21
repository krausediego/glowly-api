import { Http } from '@/application/interfaces';

export interface Middleware {
  handle(request: Http.Request): Promise<Http.Response>;
}
