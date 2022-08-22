import { Test, TestingModule } from '@nestjs/testing';
import { RegenerateService } from './regenerate.service';

describe('RegenerateService', () => {
  let service: RegenerateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegenerateService],
    }).compile();

    service = module.get<RegenerateService>(RegenerateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
