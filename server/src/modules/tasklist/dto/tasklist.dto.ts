export class CreateTasklistDto {}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsMongoId, IsOptional, IsNumber } from 'class-validator';

export class CreateTaskListDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsMongoId()
  boardId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  order?: number;
}
