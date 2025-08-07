import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MailService } from './mailer.service';


@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailService) {}

  // @Post()
  // create(@Body() createMailerDto: CreateMailerDto) {
  //   return this.mailerService.create(createMailerDto);
  // }

  // @Get()
  // findAll() {
  //   return this.mailerService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mailerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMailerDto: UpdateMailerDto) {
  //   return this.mailerService.update(+id, updateMailerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mailerService.remove(+id);
  // }
}
