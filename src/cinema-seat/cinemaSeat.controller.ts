import {
  Body,
  Controller, HttpException, HttpStatus, Post, UsePipes, ValidationPipe
} from '@nestjs/common';
import { CinemaSeatService } from './cinemaSeat.service';
import { PurchaseCinemaSeatDto } from './dto/purchase-cinema-seat.dto';

@Controller('cinemaSeat')
export class CinemaSeatController {
  constructor(private readonly cinemaSeatService: CinemaSeatService) { }

  /**
   * Purchase cinema seat
   * @param {string} Seat Number
   * @param {string} Cinema ID
   * @param {string} User ID
   * @returns {string} purchased seat ID
  */
  @Post('purchase/one')
  @UsePipes(ValidationPipe)
  purchaseSeat(@Body() purchaseCinemaSeatDto: PurchaseCinemaSeatDto) {
    try {
      return this.cinemaSeatService.purchaseCinemaSeat(purchaseCinemaSeatDto);
    } catch (error: any) {
      throw new HttpException(
        error?.message || 'Something went wrong',
        error?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
