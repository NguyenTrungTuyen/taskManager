import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;
}

export class LoginUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}


export class RefreshTokenDto {
  @ApiProperty()
  @IsString()
  refreshToken: string;
}


export class ChangePasswordDto {

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'OldPass123' })
  @IsString()
  oldPassword: string;

  @ApiProperty({ example: 'NewPass456' })
  @IsString()
  @MinLength(6)
  newPassword: string;

  @ApiProperty({ example: 'NewPass456' })
  @IsString()
  @MinLength(6)
  comparePassword: string;

}

export class ForgotPasswordDto {
  @ApiProperty({ example: 'w@gmail.com'})
  @IsEmail()
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: ''})
  @IsString()
  token: string;

  @ApiProperty({ example: 'NewPass456' })
  @IsString()
  @MinLength(6)   
  newPassword: string;  
}