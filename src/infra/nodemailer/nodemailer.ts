import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { NodemailerManager } from '@/domain/interfaces';
import env from '@/main/config/environments/smtp';

export class Nodemailer implements NodemailerManager {
  constructor() {}

  async sendMail({
    email,
    code,
  }: NodemailerManager.SendMailProps): Promise<void> {
    await this.transporterConfigs().sendMail({
      from: env.user,
      to: email,
      subject: 'Código de recuperação de conta',
      html: this.createHtml(code),
    });
  }

  private transporterConfigs(): nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  > {
    const transporter = nodemailer.createTransport({
      host: env.host,
      port: env.port,
      secure: true,
      auth: {
        user: env.user,
        pass: env.pass,
      },
    });

    return transporter;
  }

  private createHtml(code: string): string {
    return `
      <h2>Recuperação de conta</h2>
      <p><strong>Código:</strong> ${code}</p>
    `;
  }
}
