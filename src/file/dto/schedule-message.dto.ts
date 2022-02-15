import { IsNotEmpty, IsOptional } from 'class-validator';

export class ScheduleMessageDTO {
    
    @IsNotEmpty()
    scheduleDate: Date;

    @IsNotEmpty()
    number: string;

    @IsNotEmpty()
    userId: number;

    @IsOptional()
    message: string;

    @IsOptional()
    fileName: string;

  } 