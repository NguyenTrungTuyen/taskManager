import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEnum, IsMongoId } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class AddMemberDto {
  @ApiProperty()
  @IsMongoId()
  userId: string;

  @ApiProperty({ enum: ['admin', 'editor', 'viewer'] })
  @IsEnum(['admin', 'editor', 'viewer'])
  role: 'admin' | 'editor' | 'viewer';
}
