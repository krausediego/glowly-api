import { Router } from 'express';

import {
  favoriteCreateValidateSchema,
  favoriteRemoveValidateSchema,
} from '@/domain/schemas/favorite';

import { adaptRoute } from '../adapters';
import { makeFavoriteController } from '../factories/application/controllers';
import { authToken, validateRequest } from '../middlewares';

export default (router: Router): void => {
  router.post(
    '/favorite/create',
    authToken('auth'),
    validateRequest(favoriteCreateValidateSchema),
    adaptRoute(makeFavoriteController('favoriteCreate')),
  );

  router.delete(
    '/favorite/remove',
    authToken('auth'),
    validateRequest(favoriteRemoveValidateSchema),
    adaptRoute(makeFavoriteController('favoriteRemove')),
  );
};
