import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cinema } from 'src/typeorm';
import { CinemaSeatModule } from 'src/cinema-seat/cinemaSeat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cinema]),
    CinemaSeatModule
  ],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
