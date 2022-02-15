import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors, BadRequestException, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt.auth-guard';
import { ValidatorPipe } from 'src/validator-pipe';
import { ScheduleMessageDTO } from './dto/schedule-message.dto';
import { ScheduleMessageService } from './schedule-message.service';

@Controller('upload')
export class ScheduleMessageController {
  constructor(private readonly scheduleMessageService: ScheduleMessageService) { }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() createFileDto: ScheduleMessageDTO) {

    if (file) {

      const sizeInMb = +(file.size / (1024 * 1024)).toFixed(2);

      if (sizeInMb > 64) {
        throw new BadRequestException('Tamanho do arquivo excedo 64mb');
      }
      createFileDto.fileName = file.originalname

      const fileSaved = this.scheduleMessageService.create(createFileDto)
      if (fileSaved) {
        return fileSaved;
      }

    }



  }


}
