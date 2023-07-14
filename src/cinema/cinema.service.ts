import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cinema } from 'src/typeorm';
import { Repository } from 'typeorm';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { CinemaSeatService } from 'src/cinema-seat/cinemaSeat.service';

@Injectable()
export class CinemaService {
  constructor(
    @InjectRepository(Cinema)
    private readonly cinemaRepository: Repository<Cinema>,
    private readonly cinemaSeatService: CinemaSeatService
  ) {}

  /*
    This function will create cinema with no of seats passed in body params
  */
  async createCinema(params: CreateCinemaDto) {
    const newCinema = this.cinemaRepository.create({
      ...params
    });
    
    const newCreatedCinema = await this.cinemaRepository.save(newCinema);
    
    await this.cinemaSeatService.createCinemaSeat(newCreatedCinema.id, parseInt(params.noOfSeats.toString()))
    return newCreatedCinema.id
  }
}
