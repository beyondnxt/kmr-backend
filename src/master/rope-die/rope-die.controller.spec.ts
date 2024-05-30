import { Test, TestingModule } from '@nestjs/testing';
import { RopeDieController } from './rope-die.controller';

describe('RopeDieController', () => {
  let controller: RopeDieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RopeDieController],
    }).compile();

    controller = module.get<RopeDieController>(RopeDieController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
