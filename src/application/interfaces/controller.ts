import { Http } from '@/application/interfaces';

export interface Controller {
  handle(request: Http.Request<any>): Promise<Http.Response>;
}
