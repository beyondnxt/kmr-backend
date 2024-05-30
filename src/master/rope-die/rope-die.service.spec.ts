import { Test, TestingModule } from '@nestjs/testing';
import { RopeDieService } from './rope-die.service';

describe('RopeDieService', () => {
  let service: RopeDieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RopeDieService],
    }).compile();

    service = module.get<RopeDieService>(RopeDieService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
