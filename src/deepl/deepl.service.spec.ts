import { Test, TestingModule } from '@nestjs/testing';
import { DeeplService } from './deepl.service';

describe('DeeplService', () => {
  let service: DeeplService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeeplService],
    }).compile();

    service = module.get<DeeplService>(DeeplService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
