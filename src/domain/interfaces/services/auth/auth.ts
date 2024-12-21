import {
  AuthRecoveryResetPassword,
  AuthRecoverySendCode,
  AuthRecoveryValidateCode,
  AuthSignIn,
  AuthSignUp,
} from '.';

export namespace Auth {
  export type AuthServicesName =
    | 'authSignUp'
    | 'authSignIn'
    | 'authRecoverySendCode'
    | 'authRecoveryValidateCode'
    | 'authRecoveryResetPassword';

  export type AuthServices = () =>
    | AuthSignUp
    | AuthSignIn
    | AuthRecoverySendCode
    | AuthRecoveryValidateCode
    | AuthRecoveryResetPassword;
}
