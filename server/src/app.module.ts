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
import { CommonModule } from './common/common.module';
import { TasklistModule } from './modules/tasklist/tasklist.module';

@Module({
  imports: [AuthModule, UserModule, WorkspaceModule, BoardModule, TaskModule, CommentModule, NotificationModule, SocketModule, CommonModule, TasklistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
