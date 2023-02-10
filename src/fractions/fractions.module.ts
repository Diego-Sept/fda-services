import { Module } from '@nestjs/common';
import { FractionsService } from './fractions.service';
import { FractionsController } from './fractions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fraction } from './entities/fraction.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fraction])
  ],
  controllers: [FractionsController],
  providers: [FractionsService],
  exports:[
    TypeOrmModule,
    FractionsService
  ]
})
export class FractionsModule {}
