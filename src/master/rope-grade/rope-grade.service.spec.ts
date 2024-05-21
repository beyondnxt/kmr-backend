import { Test, TestingModule } from '@nestjs/testing';
import { RopeGradeService } from './rope-grade.service';

describe('RopeGradeService', () => {
  let service: RopeGradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RopeGradeService],
    }).compile();

    service = module.get<RopeGradeService>(RopeGradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
