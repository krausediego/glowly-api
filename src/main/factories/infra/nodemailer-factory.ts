import { NodemailerManager } from '@/domain/interfaces';
import { Nodemailer } from '@/infra/nodemailer';

export const makeNodemailer = (): NodemailerManager => {
  return new Nodemailer();
};
