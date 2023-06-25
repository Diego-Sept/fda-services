import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventController } from './events.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [EventController],
  providers: [EventsService],
  exports:[
    TypeOrmModule
  ]
})
export class EventsModule {}
