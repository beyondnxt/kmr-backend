import { Test, TestingModule } from '@nestjs/testing';
import { RopeKgLenghtService } from './rope-kg-lenght.service';

describe('RopeKgLenghtService', () => {
  let service: RopeKgLenghtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RopeKgLenghtService],
    }).compile();

    service = module.get<RopeKgLenghtService>(RopeKgLenghtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
