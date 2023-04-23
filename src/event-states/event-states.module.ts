import { Module } from '@nestjs/common';
import { EventStatesService } from './event-states.service';
import { EventStatesController } from './event-states.controller';

@Module({
  controllers: [EventStatesController],
  providers: [EventStatesService]
})
export class EventStatesModule {}
