import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasklistService } from './tasklist.service';
import { CreateTasklistDto } from './dto/tasklist.dto';
import { UpdateTasklistDto } from './dto/update-tasklist.dto';

@Controller('tasklist')
export class TasklistController {
  constructor(private readonly tasklistService: TasklistService) {}

  @Post()
  create(@Body() createTasklistDto: CreateTasklistDto) {
    return this.tasklistService.create(createTasklistDto);
  }

  @Get()
  findAll() {
    return this.tasklistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasklistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTasklistDto: UpdateTasklistDto) {
    return this.tasklistService.update(+id, updateTasklistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasklistService.remove(+id);
  }
}
