import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { CinemaSeat } from './cinema-seats.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @OneToOne(() => CinemaSeat, (cinemaSeat) => cinemaSeat.user) cinemaSeat: CinemaSeat;
}
