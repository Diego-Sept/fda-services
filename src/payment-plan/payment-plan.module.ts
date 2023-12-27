import { Module, forwardRef } from '@nestjs/common';
import { PaymentPlanService } from './payment-plan.service';
import { PaymentPlanController } from './payment-plan.controller';
import { PaymentPlan } from './entities/payment-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from 'src/events/events.module';
import { ClientsModule } from 'src/clients/clients.module';
import { DuesModule } from 'src/dues/dues.module';
import { BudgetsModule } from 'src/budgets/budgets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentPlan]),
    forwardRef(() => EventsModule),
    forwardRef(() => ClientsModule),
    forwardRef(() => DuesModule),
    forwardRef(() => BudgetsModule)
  ],
  controllers: [PaymentPlanController],
  providers: [PaymentPlanService],
  exports: [
    TypeOrmModule,
    PaymentPlanService
  ]
})
export class PaymentPlanModule {}
