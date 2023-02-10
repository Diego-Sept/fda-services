import { Test, TestingModule } from '@nestjs/testing';
import { ClientFractionService } from './client-fraction.service';

describe('ClientFractionService', () => {
  let service: ClientFractionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientFractionService],
    }).compile();

    service = module.get<ClientFractionService>(ClientFractionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
