import { Test, TestingModule } from '@nestjs/testing';
import { ParentCategoryController } from './parent-category.controller';

describe('ParentCategoryController', () => {
  let controller: ParentCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParentCategoryController],
    }).compile();

    controller = module.get<ParentCategoryController>(ParentCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
