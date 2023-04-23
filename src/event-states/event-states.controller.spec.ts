import { Test, TestingModule } from '@nestjs/testing';
import { EventStatesController } from './event-states.controller';
import { EventStatesService } from './event-states.service';

describe('EventStatesController', () => {
  let controller: EventStatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventStatesController],
      providers: [EventStatesService],
    }).compile();

    controller = module.get<EventStatesController>(EventStatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
