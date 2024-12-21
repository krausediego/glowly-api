import { AuthController } from '@/application/controllers';
import { Controller } from '@/application/interfaces';
import { Auth } from '@/domain/interfaces';
import { makeAuthService } from '@/main/factories/domain/services';

export const makeAuthController = (
  serviceName: Auth.AuthServicesName,
): Controller => {
  return new AuthController(serviceName, makeAuthService(serviceName));
};
