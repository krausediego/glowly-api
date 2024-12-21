import { hash, compare } from 'bcryptjs';

import { HashManager } from '@/domain/interfaces';

export class Hash implements HashManager {
  constructor() {}

  generateHash(value: string): Promise<string> {
    return hash(value, 4);
  }

  compareHash(value: string, valueHash: string): Promise<boolean> {
    return compare(value, valueHash);
  }
}
