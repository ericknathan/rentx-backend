import nodemailer, { Transporter } from 'nodemailer';
import { SES } from 'aws-sdk';

import { IMailProvider } from '../IMailProvider';

class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    console.log({
      apiVersion: '2010-12-01',
      region: process.env.AWS_REGION,
    });
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: object,
    template: ({}) => string
  ): Promise<void> {
    const parsedTemplate = template(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx | Suporte <rentx@ericknathan.tech>',
      subject,
      html: parsedTemplate,
    });
  }
}

export { SESMailProvider };
