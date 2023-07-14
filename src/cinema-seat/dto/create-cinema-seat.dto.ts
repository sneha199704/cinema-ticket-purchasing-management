import { IsNotEmpty } from 'class-validator';

export class CreateCinemaSeatDto {
  @IsNotEmpty()
  cinemaId: string;

  @IsNotEmpty()
  userId: string;
}
