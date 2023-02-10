import { Test, TestingModule } from '@nestjs/testing';
import { SaloonsController } from './saloons.controller';
import { SaloonsService } from './saloons.service';

describe('SaloonsController', () => {
  let controller: SaloonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaloonsController],
      providers: [SaloonsService],
    }).compile();

    controller = module.get<SaloonsController>(SaloonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
