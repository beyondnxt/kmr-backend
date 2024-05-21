import { Test, TestingModule } from '@nestjs/testing';
import { RopeKgLengthService } from './rope-kg-length.service';

describe('RopeKgLengthService', () => {
  let service: RopeKgLengthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RopeKgLengthService],
    }).compile();

    service = module.get<RopeKgLengthService>(RopeKgLengthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
