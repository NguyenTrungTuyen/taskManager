import { Module } from '@nestjs/common';
import { TasklistService } from './tasklist.service';
import { TasklistController } from './tasklist.controller';

@Module({
  controllers: [TasklistController],
  providers: [TasklistService],
})
export class TasklistModule {}
