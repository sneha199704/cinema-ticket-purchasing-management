import { IsNotEmpty } from 'class-validator';

export class PurchaseCinemaSeatDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  userId: string;
}
