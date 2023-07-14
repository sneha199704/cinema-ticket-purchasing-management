import { IsNotEmpty } from 'class-validator';

export class CreateCinemaDto {
  @IsNotEmpty()
  noOfSeats: number;
}
