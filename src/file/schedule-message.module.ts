import { Module } from '@nestjs/common';
import { ScheduleMessageService } from './schedule-message.service';
import { ScheduleMessageController } from './schedule-message.controller';

@Module({
  controllers: [ScheduleMessageController],
  providers: [ScheduleMessageService]
})
export class ScheduleMessageModule {}
