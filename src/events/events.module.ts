import { Module, forwardRef } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './events.controller';
import { ClientsModule } from 'src/clients/clients.module';
import { FractionsModule } from 'src/fractions/fractions.module';
import { SaloonsModule } from 'src/saloons/saloons.module';
import { EventStatesModule } from 'src/event-states/event-states.module';
import { EventTypesModule } from 'src/event-types/event-types.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
    forwardRef(() => ClientsModule),
    forwardRef(() => FractionsModule),
    forwardRef(() => SaloonsModule),
    forwardRef(() => EventStatesModule),
    forwardRef(() => EventTypesModule)
  ],
  controllers: [EventController],
  providers: [EventsService],
  exports:[
    TypeOrmModule,
    EventsService
  ]
})
export class EventsModule {}
