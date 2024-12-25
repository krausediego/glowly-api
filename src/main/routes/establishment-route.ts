import { Router } from 'express';
import multer from 'multer';

import { establishmentCreateValidateSchema } from '@/domain/schemas';
import { adaptRoute } from '@/main/adapters';
import { makeEstablishmentController } from '@/main/factories/application/controllers';
import { authToken, validateRequest } from '@/main/middlewares';

const upload = multer({ dest: 'uploads/' });

export default (router: Router): void => {
  router.post(
    '/establishment/create',
    upload.single('logo'),
    authToken('auth'),
    validateRequest(establishmentCreateValidateSchema),
    adaptRoute(makeEstablishmentController('establishmentCreate')),
  );

  router.get(
    '/establishment/find-all',
    authToken('auth'),
    adaptRoute(makeEstablishmentController('establishmentFindAll')),
  );
};
