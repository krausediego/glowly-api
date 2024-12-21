import { Middleware } from '@/application/interfaces';
import { ValidateRequestMiddleware } from '@/application/middlewares';

export const makeValidateRequestMiddleware = (): Middleware => {
  return new ValidateRequestMiddleware();
};
