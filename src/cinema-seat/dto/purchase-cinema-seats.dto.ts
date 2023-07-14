import { IsNotEmpty } from 'class-validator';

export class PurchaseCinemaSeatsDto {
  @IsNotEmpty()
  cinemaId: string;

  @IsNotEmpty()
  userId: string;
}
