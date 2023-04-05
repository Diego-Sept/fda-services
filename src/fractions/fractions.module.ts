import { Module } from '@nestjs/common';
import { FractionsService } from './fractions.service';
import { FractionsController } from './fractions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fraction } from './entities/fraction.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { ClientFractionModule } from 'src/client-fraction/client-fraction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fraction]),
    ClientFractionModule,
    ClientsModule
  ],
  controllers: [FractionsController],
  providers: [FractionsService],
  exports:[
    TypeOrmModule,
    FractionsService
  ]
})
export class FractionsModule {}
