import { Module } from '@nestjs/common';
import { PaymentPlanService } from './payment-plan.service';
import { PaymentPlanController } from './payment-plan.controller';

@Module({
  controllers: [PaymentPlanController],
  providers: [PaymentPlanService]
})
export class PaymentPlanModule {}
