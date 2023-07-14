import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CinemaSeat } from './cinema-seats.entity';

@Entity()
export class Cinema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: false,
    default: 0,
  })
  noOfSeats: number;

  @OneToMany(() => CinemaSeat, (cinemaSeat) => cinemaSeat.cinema) cinemaSeats: CinemaSeat[];
}
