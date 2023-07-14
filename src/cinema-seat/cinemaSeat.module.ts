import { Module } from '@nestjs/common';
import { CinemaSeatService } from './cinemaSeat.service';
import { CinemaSeatController } from './cinemaSeat.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaSeat } from 'src/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CinemaSeat])],
  controllers: [CinemaSeatController],
  providers: [CinemaSeatService],
  exports: [CinemaSeatService],
})
export class CinemaSeatModule {}
