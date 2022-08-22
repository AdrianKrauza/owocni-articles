import { Test, TestingModule } from '@nestjs/testing';
import { ParseMarkdownService } from './parse-markdown.service';

describe('ParseMarkdownService', () => {
  let service: ParseMarkdownService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParseMarkdownService],
    }).compile();

    service = module.get<ParseMarkdownService>(ParseMarkdownService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
