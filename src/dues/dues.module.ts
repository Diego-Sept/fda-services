import { Module } from '@nestjs/common';
import { DuesService } from './dues.service';
import { DuesController } from './dues.controller';

@Module({
  controllers: [DuesController],
  providers: [DuesService]
})
export class DuesModule {}
