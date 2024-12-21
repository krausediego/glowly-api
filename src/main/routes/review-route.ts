import { Router } from 'express';

import { reviewCreateValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeReviewController } from '@/main/factories/application/controllers';
import { authToken, validateRequest } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/review/create',
    authToken('auth'),
    validateRequest(reviewCreateValidateSchema),
    adaptRoute(makeReviewController('reviewCreate')),
  );
};
