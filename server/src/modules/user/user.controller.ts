import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Put, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JWTAuthGuard } from '../../common/passport/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  @UseGuards(JWTAuthGuard)
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }



  // @UseGuards(JWTAuthGuard)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }

  @UseGuards(JWTAuthGuard)
  @Delete(':id')
  async softDeleteUser(@Param('id') id: string) {
    const result = await this.userService.softDelete(id);
    if (!result) {
      throw new NotFoundException('User not found or already inactive');
    }
    return { message: 'User soft-deleted successfully' };
  }


  @UseGuards(JWTAuthGuard)
  @Put('update')
  updateProfile(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(req.user.userId, updateUserDto);
  }

}
