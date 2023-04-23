import { Test, TestingModule } from '@nestjs/testing';
import { EventStatesService } from './event-states.service';

describe('EventStatesService', () => {
  let service: EventStatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventStatesService],
    }).compile();

    service = module.get<EventStatesService>(EventStatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
