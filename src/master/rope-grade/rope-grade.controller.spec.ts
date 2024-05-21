import { Test, TestingModule } from '@nestjs/testing';
import { RopeGradeController } from './rope-grade.controller';

describe('RopeGradeController', () => {
  let controller: RopeGradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RopeGradeController],
    }).compile();

    controller = module.get<RopeGradeController>(RopeGradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
