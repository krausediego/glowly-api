import { AnyObjectSchema } from 'yup';

import { adaptMiddleware } from '@/main/adapters';

import { makeValidateRequestMiddleware } from '../factories/application/middlewares';

export const validateRequest = (schema: AnyObjectSchema) =>
  adaptMiddleware(makeValidateRequestMiddleware(), schema);
