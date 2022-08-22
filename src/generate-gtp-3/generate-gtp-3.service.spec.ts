import { Test, TestingModule } from '@nestjs/testing';
import { GenerateGtp3Service } from './generate-gtp-3.service';

describe('GenerateGtp3Service', () => {
  let service: GenerateGtp3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenerateGtp3Service],
    }).compile();

    service = module.get<GenerateGtp3Service>(GenerateGtp3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
