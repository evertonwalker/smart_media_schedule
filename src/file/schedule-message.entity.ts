import { User } from 'src/users/user.entity';
import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class ScheduleMessage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ nullable: false })
    number: string;

    @Column()
    message: string;
  
    @Column()
    @CreateDateColumn()
    scheduleDate: Date;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Column()
    fileName: string;
  
  }