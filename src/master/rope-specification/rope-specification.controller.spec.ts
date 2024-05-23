import { Test, TestingModule } from '@nestjs/testing';
import { RopeSpecificationController } from './rope-specification.controller';

describe('RopeSpecificationController', () => {
  let controller: RopeSpecificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RopeSpecificationController],
    }).compile();

    controller = module.get<RopeSpecificationController>(RopeSpecificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
