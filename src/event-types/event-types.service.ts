import { Injectable, Logger } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { EventType } from './entities/event-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventTypesService {

  private readonly logger = new Logger(EventTypesService.name);

  constructor(
    @InjectRepository(EventType)
    private eventTypeRepository: Repository<EventType>
  ){}

  async create(createEventTypeDto: CreateEventTypeDto) {
    return await this.eventTypeRepository.save(createEventTypeDto);
  }

  async findAll() {
    return await this.eventTypeRepository.find();
  }

  async findOne(id: number) {
    return await this.eventTypeRepository.findOneBy({id: id});
  }

  async update(id: number, updateEventTypeDto: UpdateEventTypeDto) {
    let eventTypeToUpdate : EventType = await this.findOne(id);

    if (!!eventTypeToUpdate){
      eventTypeToUpdate.name = updateEventTypeDto.name;
    } 
        
    return await this.eventTypeRepository.save(eventTypeToUpdate);
  }

  async remove(id: number) {
    return await this.eventTypeRepository.delete(id);
  }
}
