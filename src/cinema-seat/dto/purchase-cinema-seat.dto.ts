import { IsNotEmpty } from 'class-validator';

export class PurchaseCinemaSeatDto {
  @IsNotEmpty()
  seatNumber: number;

  @IsNotEmpty()
  cinemaId: string;

  @IsNotEmpty()
  userId: string;
}
