import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPassword(email: string, token: string) {
    const resetLink = `https://localhost:3000/reset-password?token=${token}`;
    await this.mailerService.sendMail({
      to: email,
      subject: 'Reset your password',
      text: `Click here to reset your password: ${resetLink}`,
      html: `<p>Click here to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
    }); 
  }
}
