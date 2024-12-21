import { IToken } from '@/domain/interfaces';
import { Token } from '@/infra/token';

export const makeToken = (): IToken => {
  return new Token();
};
