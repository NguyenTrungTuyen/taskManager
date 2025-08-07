import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { BoardModule } from './modules/board/board.module';
import { TaskModule } from './modules/task/task.module';
import { CommentModule } from './modules/comment/comment.module';
import { NotificationModule } from './modules/notification/notification.module';
import { SocketModule } from './modules/socket/socket.module';
// import { CommonModule } from './common/common.module';
import { TasklistModule } from './modules/tasklist/tasklist.module';

import { ConfigModule, ConfigService } from "@nestjs/config"
import { MongooseModule } from '@nestjs/mongoose';
import { CustomMailerModule, } from './modules/mailer/mailer.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    WorkspaceModule,
    BoardModule,
    TaskModule,
    CommentModule,
    NotificationModule,
    SocketModule,
    // CommonModule,
    TasklistModule,
    // Config module - load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
    }),
    // Database connection
   ConfigModule.forRoot({isGlobal: true}),

   MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),

    CustomMailerModule,


  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [CustomMailerModule],
})
export class AppModule {}
