import { getHttpError, ok } from '@/application/helpers';
import { Http, Middleware, ValidateMiddleware } from '@/application/interfaces';

import { BadRequestError } from '../errors';

export class ValidateRequestMiddleware implements Middleware {
  async handle(request: Http.Request<ValidateMiddleware.Data>) {
    const { body, params, query, schema } = request.data;

    try {
      await schema.validate(
        {
          body,
          params,
          query,
        },
        { abortEarly: false },
      );

      return ok({ validated: true });
    } catch (error: any) {
      return getHttpError(new BadRequestError(error.errors));
    }
  }
}
