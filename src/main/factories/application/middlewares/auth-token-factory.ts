import { Middleware } from '@/application/interfaces';
import { AuthTokenMiddleware } from '@/application/middlewares';

import { makeToken } from '../../infra';

export const makeAuthToken = (origin: 'auth' | 'recovery'): Middleware => {
  return new AuthTokenMiddleware(makeToken(), origin);
};
