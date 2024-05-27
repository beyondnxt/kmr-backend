import { Test, TestingModule } from '@nestjs/testing';
import { RopeMachineController } from './rope-machine.controller';

describe('RopeMachineController', () => {
  let controller: RopeMachineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RopeMachineController],
    }).compile();

    controller = module.get<RopeMachineController>(RopeMachineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
