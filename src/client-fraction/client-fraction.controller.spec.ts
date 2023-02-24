import { Test, TestingModule } from '@nestjs/testing';
import { ClientFractionController } from './client-fraction.controller';
import { ClientFractionService } from './client-fraction.service';

describe('ClientFractionController', () => {
  let controller: ClientFractionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientFractionController],
      providers: [ClientFractionService],
    }).compile();

    controller = module.get<ClientFractionController>(ClientFractionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
