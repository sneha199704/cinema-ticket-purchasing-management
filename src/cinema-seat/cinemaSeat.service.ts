import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaSeat } from 'src/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PurchaseCinemaSeatDto } from './dto/purchase-cinema-seat.dto';
import { messageConstants } from 'src/constants/messageConstant';

@Injectable()
export class CinemaSeatService {
  constructor(
    @InjectRepository(CinemaSeat)
    private readonly cinemaSeatRepository: Repository<CinemaSeat>,
    private readonly dataSource: DataSource
  ) { }

  /*
    This function will create cinema seats based on the seats number passed for that cinema
  */
  async createCinemaSeat(id: string, noOfSeats: number) {
    const companySeats = [];
    for (let i = 1; i <= noOfSeats; i++) {
      companySeats.push({
        cinemaId: id,
        seatNumber: i
      })
    }

    await this.dataSource
      .createQueryBuilder()
      .insert()
      .into(CinemaSeat)
      .values(companySeats)
      .execute()
  }

  /*
    This function will purchase a specific seat
  */
  async purchaseCinemaSeat(purchaseCinemaSeatParams: PurchaseCinemaSeatDto) {
    const purchasedSeat = await this.cinemaSeatRepository.findOne({
      where: {
        cinemaId: purchaseCinemaSeatParams.cinemaId,
        seatNumber: purchaseCinemaSeatParams.seatNumber,
      }
    })

    if (!purchasedSeat) {
      throw new HttpException(
        messageConstants.CINEMA_SEAT_NOT_FOUND,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (purchasedSeat.isBooked && purchasedSeat.userId !== purchaseCinemaSeatParams.userId) {
      throw new HttpException(
        messageConstants.CINEMA_SEAT_IS_BOOKED,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    purchasedSeat.isBooked = true
    purchasedSeat.userId = purchaseCinemaSeatParams.userId
    await this.cinemaSeatRepository.save(purchasedSeat)
    return purchaseCinemaSeatParams.seatNumber
  }
}
