import { Injectable } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../data/schema/user.schema';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

   constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async softDelete(id: string): Promise<boolean> {
    const user = await this.userModel.findById(id);
    if (!user || !user.isActive) return false;

    user.isActive = false;
    await user.save();
    return true;
  }

  
}
