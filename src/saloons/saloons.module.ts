import { Module } from '@nestjs/common';
import { SaloonsService } from './saloons.service';
import { SaloonsController } from './saloons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saloon } from './entities/saloon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Saloon])
  ],
  controllers: [SaloonsController],
  providers: [SaloonsService],
  exports: [
    TypeOrmModule,
    SaloonsService
  ]
})
export class SaloonsModule {}
