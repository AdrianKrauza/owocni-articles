import { Test, TestingModule } from '@nestjs/testing';
import { SendDataService } from './send-data.service';

describe('SendDataService', () => {
  let service: SendDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SendDataService],
    }).compile();

    service = module.get<SendDataService>(SendDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
