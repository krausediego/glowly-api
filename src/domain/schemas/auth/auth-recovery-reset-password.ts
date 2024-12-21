import * as yup from 'yup';

export const recoveryResetPasswordValidateSchema = yup.object({
  body: yup.object({
    password: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres.')
      .required('A senha é obrigatória'),
  }),
});
