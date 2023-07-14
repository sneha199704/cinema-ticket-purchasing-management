import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaSeat } from 'src/typeorm';
import { DataSource, Repository, In } from 'typeorm';
import { PurchaseCinemaSeatDto } from './dto/purchase-cinema-seat.dto';
import { messageConstants } from 'src/constants/messageConstant';
import { PurchaseCinemaSeatsDto } from './dto/purchase-cinema-seats.dto';

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

  /*
    This function will purchase two consecutive seats if available
  */
    async purchaseTwoConsecutiveCinemaSeats(purchaseCinemaSeatsParams: PurchaseCinemaSeatsDto) {
      const nonPurchasedSeats = await this.cinemaSeatRepository.find({
        where: {
          cinemaId: purchaseCinemaSeatsParams.cinemaId,
          isBooked: false
        },
        order: {
          seatNumber: "ASC"
        },
        take: 2
      })
  
      if (nonPurchasedSeats.length !== 2 || ((nonPurchasedSeats[1]?.seatNumber - nonPurchasedSeats[0]?.seatNumber) > 1)) {
        throw new HttpException(
          messageConstants.CINEMA_SEAT_IS_BOOKED,
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const seatNumbers = nonPurchasedSeats.map(seat => seat.seatNumber)
      nonPurchasedSeats[0].isBooked = true
      nonPurchasedSeats[0].userId = purchaseCinemaSeatsParams.userId
      nonPurchasedSeats[1].isBooked = true
      nonPurchasedSeats[1].userId = purchaseCinemaSeatsParams.userId
      await this.cinemaSeatRepository.save(nonPurchasedSeats)
      return seatNumbers
    }
}
