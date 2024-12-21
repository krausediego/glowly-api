import {
  Auth,
  AuthRecoveryResetPassword,
  AuthRecoverySendCode,
  AuthRecoveryValidateCode,
  AuthSignIn,
  AuthSignUp,
} from '@/domain/interfaces';
import {
  AuthSignInService,
  AuthSignUpService,
  AuthRecoverySendCodeService,
  AuthRecoveryValidateCodeService,
  AuthRecoveryResetPasswordService,
} from '@/domain/services';
import { makeHash, makeNodemailer, makeToken } from '@/main/factories/infra';

const authSignUp = (): AuthSignUp => {
  return new AuthSignUpService(makeHash(), makeToken());
};

const authSignIn = (): AuthSignIn => {
  return new AuthSignInService(makeHash(), makeToken());
};

const authRecoverySendCode = (): AuthRecoverySendCode => {
  return new AuthRecoverySendCodeService(makeToken(), makeNodemailer());
};

const authRecoveryValidateCode = (): AuthRecoveryValidateCode => {
  return new AuthRecoveryValidateCodeService(makeToken());
};

const authRecoveryResetPassword = (): AuthRecoveryResetPassword => {
  return new AuthRecoveryResetPasswordService(makeToken(), makeHash());
};

const services = {
  authSignUp,
  authSignIn,
  authRecoverySendCode,
  authRecoveryValidateCode,
  authRecoveryResetPassword,
};

const makeAuthService = (
  serviceName: Auth.AuthServicesName,
): Auth.AuthServices => {
  return services[serviceName];
};

export { makeAuthService };
