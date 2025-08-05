import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsMongoId,
  IsArray,
  IsDateString,
  ValidateNested,
  IsBoolean
} from 'class-validator';
import { Type } from 'class-transformer';

class ChecklistItemDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsBoolean()
  done: boolean;
}

export class CreateTaskDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsMongoId()
  listId: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  assignees?: string[];

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  tags?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  dueDate?: Date;

  @ApiProperty({ type: [ChecklistItemDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ChecklistItemDto)
  checklist?: ChecklistItemDto[];
}
