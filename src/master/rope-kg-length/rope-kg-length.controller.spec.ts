import { Test, TestingModule } from '@nestjs/testing';
import { RopeKgLengthController } from './rope-kg-length.controller';

describe('RopeKgLengthController', () => {
  let controller: RopeKgLengthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RopeKgLengthController],
    }).compile();

    controller = module.get<RopeKgLengthController>(RopeKgLengthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
