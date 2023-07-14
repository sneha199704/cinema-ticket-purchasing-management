import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cinema } from './cinema.entity';
import { User } from './user.entity';

@Entity()
export class CinemaSeat {
  @Column()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
  })
  cinemaId: string;

  @Column({
    nullable: false,
    default: 0,
  })
  seatNumber: number;

  @Column({
    type: 'boolean',
    default: false
  })
  isBooked: boolean;

  @Column({
    type: 'uuid',
    nullable: true
  })
  userId: string;

  @ManyToOne(() => Cinema, (cinema) => cinema.cinemaSeats, {
    cascade: true,
  })
  @JoinTable()
  cinema: Cinema;

  @OneToOne(() => User, (user) => user.cinemaSeat, {
    cascade: true,
  })
  @JoinTable()
  user: User;
}
