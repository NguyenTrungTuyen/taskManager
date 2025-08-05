import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsMongoId } from 'class-validator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsMongoId()
  user: string;

  @ApiProperty({ enum: ['task_assigned', 'comment_mention', 'task_updated'] })
  @IsEnum(['task_assigned', 'comment_mention', 'task_updated'])
  type: 'task_assigned' | 'comment_mention' | 'task_updated';

  @ApiProperty()
  @IsString()
  content: string;
}
