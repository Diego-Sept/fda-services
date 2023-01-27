import { Module } from '@nestjs/common';
import { FractionsService } from './fractions.service';
import { FractionsController } from './fractions.controller';

@Module({
  controllers: [FractionsController],
  providers: [FractionsService]
})
export class FractionsModule {}
