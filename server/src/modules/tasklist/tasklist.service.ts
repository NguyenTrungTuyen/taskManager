import { Injectable } from '@nestjs/common';
import { CreateTasklistDto } from './dto/tasklist.dto';
// import { UpdateTasklistDto } from './dto/update-tasklist.dto';

@Injectable()
export class TasklistService {
  create(createTasklistDto: CreateTasklistDto) {
    return 'This action adds a new tasklist';
  }

  findAll() {
    return `This action returns all tasklist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tasklist`;
  }

  // update(id: number, updateTasklistDto: UpdateTasklistDto) {
  //   return `This action updates a #${id} tasklist`;
  // }

  remove(id: number) {
    return `This action removes a #${id} tasklist`;
  }
}
