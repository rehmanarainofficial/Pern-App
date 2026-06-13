import { Injectable } from '@nestjs/common';
import { otpEmailTemplate } from './templates/sendEmailTemplate';
import { verificationSuccessTemplate } from './templates/emailVerificationTemplate';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendOtp(to: string, subject: string, otp: string) {
    return await this.transporter.sendMail({
      from: `"Social Media App" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html: otpEmailTemplate(otp),
    });
  }

  async sendVerificationSuccessEmail(to: string, username: string) {
    return await this.transporter.sendMail({
      from: `"Social Media App" <${process.env.SMTP_USER}>`,
      to,
      subject: 'Email Verified Successfully',
      html: verificationSuccessTemplate(username),
    });
  }
}
