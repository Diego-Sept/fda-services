import { Test, TestingModule } from '@nestjs/testing';
import { DuesController } from './dues.controller';
import { DuesService } from './dues.service';

describe('DuesController', () => {
  let controller: DuesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DuesController],
      providers: [DuesService],
    }).compile();

    controller = module.get<DuesController>(DuesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
