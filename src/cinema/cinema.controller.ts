import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCinemaDto } from 'src/cinema/dto/create-cinema.dto';
import { CinemaService } from 'src/cinema/cinema.service';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  /**
   * Create cinema
   * @param {number} no of seats
   * @returns {string} created cinema ID
  */
  @Post('create')
  @UsePipes(ValidationPipe)
  createCinema(@Body() createCinemaDto: CreateCinemaDto) {
    try {
      return this.cinemaService.createCinema(createCinemaDto);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Something went wrong',
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
