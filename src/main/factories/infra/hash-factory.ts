import { HashManager } from '@/domain/interfaces';
import { Hash } from '@/infra/hash';

export const makeHash = (): HashManager => {
  return new Hash();
};
