import { Injectable } from '@nestjs/common';
import { ScheduleMessageDTO } from './dto/schedule-message.dto';
import { ScheduleMessage } from './schedule-message.entity';

@Injectable()
export class ScheduleMessageService {

    async create(scheduleMessage: ScheduleMessageDTO): Promise<ScheduleMessage> {
        scheduleMessage['user'] = scheduleMessage.userId;
        const scheduleMsg = ScheduleMessage.create(scheduleMessage);
        await scheduleMsg.save();
        return scheduleMsg;
    }



}
