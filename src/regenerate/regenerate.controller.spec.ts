import { Test, TestingModule } from '@nestjs/testing';
import { RegenerateController } from './regenerate.controller';

describe('RegenerateController', () => {
  let controller: RegenerateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegenerateController],
    }).compile();

    controller = module.get<RegenerateController>(RegenerateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
