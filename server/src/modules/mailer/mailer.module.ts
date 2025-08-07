import { Module } from '@nestjs/common';
import { MailService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';



@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: false, 
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@localhost>',
        },
        template: {
          dir: process.cwd() + '/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        }, 
      }),
    }),
  ],
  controllers: [MailerController],
  providers: [MailService],
  exports: [MailService],
}) 

export class CustomMailerModule {}
