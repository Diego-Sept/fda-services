import { Module } from '@nestjs/common';
import { ClientFractionService } from './client-fraction.service';
import { ClientFractionController } from './client-fraction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientFraction } from './entities/client-fraction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientFraction])
  ],
  controllers: [ClientFractionController],
  providers: [ClientFractionService],
  exports: [
    TypeOrmModule,
    ClientFractionService
  ]
})
export class ClientFractionModule {}
