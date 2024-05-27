import { Test, TestingModule } from '@nestjs/testing';
import { ExtruderController } from './extruder.controller';

describe('ExtruderController', () => {
  let controller: ExtruderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExtruderController],
    }).compile();

    controller = module.get<ExtruderController>(ExtruderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
