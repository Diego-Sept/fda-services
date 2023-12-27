import { Module } from '@nestjs/common';
import { EventStatesService } from './event-states.service';
import { EventStatesController } from './event-states.controller';
import { EventState } from './entities/event-state.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([EventState])
  ],
  controllers: [EventStatesController],
  providers: [EventStatesService],
  exports: [
    TypeOrmModule,
    EventStatesService
  ]
})
export class EventStatesModule {}
