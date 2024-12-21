import * as yup from 'yup';

export const reviewCreateValidateSchema = yup.object({
  body: yup.object({
    rating: yup
      .number()
      .required('A nota é obrigatória.')
      .positive('A nota não pode ser um número negativo.'),
    establishmentId: yup
      .string()
      .required('A indicação do estabelecimento é obrigatória.'),
    message: yup.string().typeError('Digite uma mensagem válida.'),
    anonymous: yup.boolean().typeError('Informe o anônimo de forma correta.'),
  }),
});
