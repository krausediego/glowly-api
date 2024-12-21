import * as yup from 'yup';

const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;

export const establishmentCreateValidateSchema = yup.object({
  body: yup.object({
    name: yup
      .string()
      .min(8, 'O nome deve conter ao menos 8 caracteres.')
      .required('O nome é obrigatório.'),
    phone: yup
      .string()
      .matches(phoneRegex, 'Informe um telefone válido.')
      .required('O telefone é obrigatório.'),
    description: yup.string(),
  }),
});
