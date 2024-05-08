import { Test, TestingModule } from '@nestjs/testing';
import { ParentCategoryService } from './parent-category.service';

describe('ParentCategoryService', () => {
  let service: ParentCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParentCategoryService],
    }).compile();

    service = module.get<ParentCategoryService>(ParentCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
