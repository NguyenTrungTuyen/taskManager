import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto,RefreshTokenDto, ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, } from '../../data/schema/user.schema';
import { hashPasswordHelper, comparePasswordHelper } from '../../common/untils/utils';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mailer/mailer.service';


@Injectable() 
export class AuthService {
    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
    private mailService: MailService,
    private jwtService:JwtService,
  ) {}

  //check email
   isEmailExit = async(email : string) => {
    const user = await this.userModel.exists({email});
    if(user) {
      console.log(`Email: ${email} đã được sử dụng!`);
      return true;
    }
    return false;
  }



 async register(registerUserDto: RegisterUserDto) {
    const {name, email, password, } = registerUserDto;
    // check mail
    const isExit = await this.isEmailExit(email);
    if (isExit === true){
      throw new BadRequestException(`Email: ${email} đã sử dụng.`);
    }
    //hash pword
    const hashPassword = await hashPasswordHelper(password);
    const user = await this.userModel.create({
      name, email, password: hashPassword, 
    })

    return {
      _id: user._id
    };
  }

  async findByEmail (email: string){
    return await this.userModel.findOne({email})
  }


 async login(loginUserDto: LoginUserDto) {
      const user = await this.findByEmail(loginUserDto.email);
    if (!user) {
       throw new UnauthorizedException('Tài khoản không tồn tại!');
    }
    const isValidPassword = await comparePasswordHelper(loginUserDto.password, user.password)
    if (!isValidPassword) {
      throw new UnauthorizedException("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
    console.log("Đăng nhập thành công!");

    const payload = { sub:user._id, username: user.email};
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

//change password
  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.findByEmail(changePasswordDto.email);
     if (!user) {
       throw new UnauthorizedException('Tài khoản không tồn tại!');
    }
    const isValidPassword = await comparePasswordHelper(changePasswordDto.oldPassword, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException("Mật khẩu cũ không đúng!");
    }
    const newPasswordHash = await hashPasswordHelper(changePasswordDto.newPassword);
    user.password = newPasswordHash;
    
    if (changePasswordDto.newPassword !== changePasswordDto.comparePassword) {
      throw new BadRequestException("Mật khẩu mới không khớp!");
    }

    await user.save();
    return { message: 'Mật khẩu đã được thay đổi thành công!' };
  }

  //get profile
  async getProfile(userId: string) {
    
  }

  //send reset password email
  async sendResetPassEmail(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.findByEmail(forgotPasswordDto.email);
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }
    // Logic to send reset password email
    const resetToken = this.jwtService.sign({ email: user.email }, { expiresIn: '30m' });
    console.log(`Reset token: ${resetToken}`);
    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    console.log(`Reset link: ${resetLink}`);
    await this.mailService.sendResetPassword(user.email, resetLink);

    return { message: 'Email reset password đã được gửi!' };
  }

  //reset password
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const token = resetPasswordDto.token; 
    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.findByEmail(decoded.email);
      if (!user) {
        throw new UnauthorizedException('Tài khoản không tồn tại!');
      }
      // Logic to reset password
      user.password = await hashPasswordHelper(resetPasswordDto.newPassword);
      await user.save();
      // For example, you can update the user's password here
      return { message: 'Mật khẩu đã được đặt lại thành công!' };
    } catch (error) {
      throw new BadRequestException('Token không hợp lệ hoặc đã hết hạn!');
    }
  }

  async googleLogin(user: any) {
    // Logic to handle Google login
    const { email, firstName, lastName, picture } = user;
    let existingUser = await this.userModel.findOne({ $or: [{ email}, {googleId: user.googleId }] });
    
    if (!existingUser) {
      // Create a new user if it doesn't exist
      existingUser = await this.userModel.create({
        email,
        firstName,      
        lastName,
        picture,
        googleId: user.googleId,
        origin: 'google',
      });
    }

    const payload = { sub: existingUser._id, username: existingUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: existingUser,
    };
  }

  async validOrSave(user: Partial<User>) {
    const existingUser = await this.userModel.findOne({ email: user.email });
    if (existingUser) {
    // Cập nhật googleId nếu người dùng đã tồn tại
    if (user.googleId && !existingUser.googleId) {
      existingUser.googleId = user.googleId;
      await existingUser.save();
    }
    return existingUser;
  }
  const newUser = new this.userModel(user);
  return await newUser.save();
  }


}

