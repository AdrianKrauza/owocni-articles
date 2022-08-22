import { Test, TestingModule } from '@nestjs/testing';
import { GetNotionPageService } from './get-notion-page.service';

describe('GetNotionPageService', () => {
  let service: GetNotionPageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetNotionPageService],
    }).compile();

    service = module.get<GetNotionPageService>(GetNotionPageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
