import * as yup from 'yup';

export const signInValidateSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email('Informe um e-mail válido.')
      .required('O e-mail é obrigatório.'),
    password: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres.')
      .required('A senha é obrigatória'),
    customer: yup
      .boolean()
      .required('Tipo de usuário é obrigatório.')
      .typeError('Tipo de usuário em formato inválido.'),
    remember: yup.boolean().typeError('Lembrar-me em formato inválido.'),
  }),
});
