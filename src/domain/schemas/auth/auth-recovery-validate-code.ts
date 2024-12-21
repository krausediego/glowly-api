import * as yup from 'yup';

export const recoveryValidateCodeValidateSchema = yup.object({
  body: yup.object({
    code: yup.string().required('O código é obrigatório.'),
  }),
});
