import * as yup from 'yup';

const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

export const signUpValidateSchema = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email('Informe um e-mail válido.')
      .required('O e-mail é obrigatório.'),
    password: yup
      .string()
      .min(6, 'A senha deve conter no mínimo 6 caracteres.')
      .required('A senha é obrigatória'),
    name: yup
      .string()
      .min(8, 'O nome deve conter no mínimo 8 caracteres.')
      .required('O Nome é obrigatório.'),
    phone: yup
      .string()
      .matches(phoneRegex, 'Informe um telefone válido.')
      .required('O telefone é obrigatório.'),
    customer: yup
      .boolean()
      .required('Tipo de usuário é obrigatório.')
      .typeError('Tipo de usuário em formato inválido.'),
    avatarURL: yup.string(),
    birthDate: yup.date().typeError('Formato de data de nascimento inválido.'),
    gender: yup.string(),
  }),
});
