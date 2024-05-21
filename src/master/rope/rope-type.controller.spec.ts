import { Test, TestingModule } from '@nestjs/testing';
import { RopeController } from './rope-type.controller';

describe('RopeController', () => {
  let controller: RopeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RopeController],
    }).compile();

    controller = module.get<RopeController>(RopeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
