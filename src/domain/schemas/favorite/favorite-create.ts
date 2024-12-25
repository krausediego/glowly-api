import * as yup from 'yup';

export const favoriteCreateValidateSchema = yup.object({
  body: yup.object({
    establishmentId: yup
      .string()
      .required('A indicação do estabelecimento é obrigatória.'),
  }),
});
