import { Test, TestingModule } from '@nestjs/testing';
import { SaloonsService } from './saloons.service';

describe('SaloonsService', () => {
  let service: SaloonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaloonsService],
    }).compile();

    service = module.get<SaloonsService>(SaloonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
