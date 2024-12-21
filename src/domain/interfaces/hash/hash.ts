export interface HashManager {
  generateHash(value: string): Promise<string>;
  compareHash(value: string, valueHash: string): Promise<boolean>;
}
