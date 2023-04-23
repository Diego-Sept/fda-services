import { Module } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { BudgetsController } from './budgets.controller';
import { Budget } from './entities/budget.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule } from 'src/clients/clients.module';
import { ClientFractionModule } from 'src/client-fraction/client-fraction.module';
import { SaloonsModule } from 'src/saloons/saloons.module';
import { EventTypesModule } from 'src/event-types/event-types.module';
import { FractionsModule } from 'src/fractions/fractions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Budget]),
    ClientsModule,
    ClientFractionModule,
    SaloonsModule,
    EventTypesModule,
    FractionsModule
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
  exports:[
    TypeOrmModule
  ]
})
export class BudgetsModule {}
