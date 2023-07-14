import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CinemaSeat } from 'src/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CinemaSeatService {
  constructor(
    @InjectRepository(CinemaSeat)
    private readonly dataSource: DataSource
  ) {}

  /*
    This function will create cinema seats based on the seats number passed for that cinema
  */
  async createCinemaSeat(id: string, noOfSeats: number) {
    const companySeats = Array(noOfSeats).fill({
      cinemaId: id
    })
    
    await this.dataSource
    .createQueryBuilder()
    .insert()
    .into(CinemaSeat)
    .values(companySeats)
    .execute()
  }
}
