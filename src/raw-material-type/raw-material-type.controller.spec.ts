import { Test, TestingModule } from '@nestjs/testing';
import { RawMaterialTypeController } from './raw-material-type.controller';

describe('RawMaterialTypeController', () => {
  let controller: RawMaterialTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RawMaterialTypeController],
    }).compile();

    controller = module.get<RawMaterialTypeController>(RawMaterialTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
