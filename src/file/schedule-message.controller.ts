import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, BadRequestException, Get, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { ScheduleMessageDTO } from './dto/schedule-message.dto';
import { ScheduleMessage } from './schedule-message.entity';
import { ScheduleMessageService } from './schedule-message.service';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');

const MAX_FILE_LENGTH = 64;
@Controller('upload')
export class ScheduleMessageController {
  constructor(private readonly scheduleMessageService: ScheduleMessageService) { }



  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './uploads'
    }))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: ScheduleMessageDTO) {

  if (file) {

    const sizeInMb = +(file.size / (1024 * 1024)).toFixed(2);

    if (sizeInMb > MAX_FILE_LENGTH) {
      throw new BadRequestException('Tamanho do arquivo excedo 64mb');
    }
    const fileExtension = path.extname(file.originalname);
    const fileName = uuidv4() + fileExtension;
  
    file.filename = fileName;
    createFileDto.fileName = file.filename
  }

  const fileSaved = this.scheduleMessageService.create(createFileDto)

  if (fileSaved) {
    if (file) {

    }
    return fileSaved;
  }

}

@Get(':id')
@UseGuards(JwtAuthGuard)
getSchedullesFromUser(@Param('id') id: string): Promise < Array < ScheduleMessage >> {
  return this.scheduleMessageService.getSchedullesByUser(id);
}

}
