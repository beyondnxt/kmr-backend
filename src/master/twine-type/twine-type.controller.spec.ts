import { Test, TestingModule } from '@nestjs/testing';
import { TwineTypeController } from './twine-type.controller';

describe('TwineTypeController', () => {
  let controller: TwineTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TwineTypeController],
    }).compile();

    controller = module.get<TwineTypeController>(TwineTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
