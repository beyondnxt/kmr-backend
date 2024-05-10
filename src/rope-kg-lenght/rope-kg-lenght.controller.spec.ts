import { Test, TestingModule } from '@nestjs/testing';
import { RopeKgLenghtController } from './rope-kg-lenght.controller';

describe('RopeKgLenghtController', () => {
  let controller: RopeKgLenghtController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RopeKgLenghtController],
    }).compile();

    controller = module.get<RopeKgLenghtController>(RopeKgLenghtController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
