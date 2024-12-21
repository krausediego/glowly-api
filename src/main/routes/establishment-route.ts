import { Router } from 'express';

import { establishmentCreateValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeEstablishmentController } from '@/main/factories/application/controllers';
import { authToken, validateRequest } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/establishment/create',
    authToken('auth'),
    validateRequest(establishmentCreateValidateSchema),
    adaptRoute(makeEstablishmentController('establishmentCreate')),
  );
};
