import { Injectable, NotFoundException } from '@nestjs/common';
import { ScheduleMessageDTO } from './dto/schedule-message.dto';
import { ScheduleMessage } from './schedule-message.entity';

@Injectable()
export class ScheduleMessageService {

    constructor() { }

    async create(scheduleMessage: ScheduleMessageDTO): Promise<ScheduleMessage> {
        scheduleMessage['user'] = scheduleMessage.userId;
        const scheduleMsg = ScheduleMessage.create(scheduleMessage);
        await scheduleMsg.save();
        return scheduleMsg;
    }

    async getSchedullesByUser(id: string): Promise<ScheduleMessage[]> {
        const schedules = await ScheduleMessage.find({
            where: {
                user: id
            }
        })

        if (schedules.length) {
            return schedules;
        } else {
            throw new NotFoundException('Não existem agendamentos para este usuário.');
        }

    }



}
