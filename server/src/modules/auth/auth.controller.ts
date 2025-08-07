import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto, LoginUserDto, ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto  } from './dto/auth.dto';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { access } from 'fs';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get("verify-email")
  verifyEmail(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Post("resend-verify-email")
  resendVerifyEmail(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get("google")
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
   
  }
  
  @Get("google/callback")
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any) {

    console.log(req.user);

    const result = await this.authService.googleLogin(req.user); 
    return {
      message: 'Login successful',
      accessToken: result.access_token,
      // user: result.user,
    }
  }

  @Post('login')
  // @Public() 
  @ApiOperation({ summary: 'Login' }) 
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({
     description: 'Login with email and password',
     type: LoginUserDto,
   })
  create(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  
  
  @Post("forgot-password")
  async forgot_password(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.sendResetPassEmail(forgotPasswordDto);
  }
  
  @Post("reset-password")
  reset_password(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  } 
  
  @Post("change-password")
  change_password(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }

  // @Post("logout")
  // logout(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.login(loginUserDto);
  // }
  
  // @Get("profile")
  // getProfile(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.login(loginUserDto);
  // }

  // @Post("update-profile")
  // updateProfile(@Body() loginUserDto: LoginUserDto) {
  //   return this.authService.login(loginUserDto);
  // }

  
}
