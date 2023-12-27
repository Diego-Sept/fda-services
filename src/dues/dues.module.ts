import { Module } from '@nestjs/common';
import { DuesService } from './dues.service';
import { DuesController } from './dues.controller';
import { Due } from './entities/due.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Due])
  ],
  controllers: [DuesController],
  providers: [DuesService],
  exports: [
    TypeOrmModule,
    DuesService
  ]
})
export class DuesModule {}
