import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto,RefreshTokenDto, ChangePasswordDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, } from '../../data/schema/user.schema';
import { hashPasswordHelper, comparePasswordHelper } from '../../common/untils/utils';
import { JwtService } from '@nestjs/jwt';


@Injectable() 
export class AuthService {
    constructor(
      @InjectModel(User.name) private userModel: Model<User>,
    // private usersService: UsersService,
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

  
}
