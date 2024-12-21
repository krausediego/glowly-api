import * as yup from 'yup';

export const recoverySendCodeValidateSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email('Informe um e-mail válido.')
      .required('O e-mail é obrigatório.'),
  }),
});
