import { Router } from 'express';

import {
  recoveryResetPasswordValidateSchema,
  recoverySendCodeValidateSchema,
  recoveryValidateCodeValidateSchema,
  signInValidateSchema,
  signUpValidateSchema,
} from '@/domain/schemas/auth';
import { adaptRoute } from '@/main/adapters';
import { makeAuthController } from '@/main/factories/application/controllers';
import { authToken, validateRequest } from '@/main/middlewares';

export default (router: Router): void => {
  router.post(
    '/auth/sign-up',
    validateRequest(signUpValidateSchema),
    adaptRoute(makeAuthController('authSignUp')),
  );

  router.post(
    '/auth/sign-in',
    validateRequest(signInValidateSchema),
    adaptRoute(makeAuthController('authSignIn')),
  );

  router.post(
    '/auth/recovery/send-code',
    validateRequest(recoverySendCodeValidateSchema),
    adaptRoute(makeAuthController('authRecoverySendCode')),
  );

  router.post(
    '/auth/recovery/validate-code',
    authToken('recovery'),
    validateRequest(recoveryValidateCodeValidateSchema),
    adaptRoute(makeAuthController('authRecoveryValidateCode')),
  );

  router.post(
    '/auth/recovery/reset-password',
    authToken('recovery'),
    validateRequest(recoveryResetPasswordValidateSchema),
    adaptRoute(makeAuthController('authRecoveryResetPassword')),
  );
};
