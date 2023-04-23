import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventStatesService } from './event-states.service';

@Controller('event-states')
export class EventStatesController {
  constructor(private readonly eventStatesService: EventStatesService) {}

  @Get()
  findAll() {
    return this.eventStatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventStatesService.findOne(+id);
  }
}
