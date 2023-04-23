import { Injectable, Logger } from '@nestjs/common';
import { EventState } from './entities/event-state.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EventStatesService {

  private readonly logger = new Logger(EventStatesService.name);

  constructor(
    @InjectRepository(EventState)
    private eventStateRepository: Repository<EventState>
  ){}

  async findAll() {
    return await this.eventStateRepository.find();
  }

  async findOne(id: number) {
    return await this.eventStateRepository.findOneBy({id: id});
  }

}
