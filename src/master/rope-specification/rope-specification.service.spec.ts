import { Test, TestingModule } from '@nestjs/testing';
import { RopeSpecificationService } from './rope-specification.service';

describe('RopeSpecificationService', () => {
  let service: RopeSpecificationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RopeSpecificationService],
    }).compile();

    service = module.get<RopeSpecificationService>(RopeSpecificationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
