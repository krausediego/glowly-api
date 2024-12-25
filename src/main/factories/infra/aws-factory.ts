import { AwsManager } from '@/domain/interfaces';
import { Aws } from '@/infra/aws';

export const makeAws = (): AwsManager => {
  return new Aws();
};
