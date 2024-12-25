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
    categories: yup.string().required('As categorias são obrigatórias.'),
    street: yup.string().required('A rua é obrigatória.'),
    neighborhood: yup.string().required('O bairro é obrigatório.'),
    state: yup.string().required('O estado é obrigatório.'),
    city: yup.string().required('A cidade é obrigatória.'),
    cep: yup.string().required('O CEP é obrigatório.'),
    number: yup.number(),
    description: yup.string(),
    logo: yup.mixed(),
  }),
});
