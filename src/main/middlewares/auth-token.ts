import { adaptMiddleware } from '../adapters';
import { makeAuthToken } from '../factories/application/middlewares';

export const authToken = (origin: 'auth' | 'recovery') => {
  return adaptMiddleware(makeAuthToken(origin));
};
