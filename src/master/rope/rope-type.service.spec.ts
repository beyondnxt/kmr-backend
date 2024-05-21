import { Test, TestingModule } from '@nestjs/testing';
import { RopeService } from './rope-type.service';

describe('RopeService', () => {
  let service: RopeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RopeService],
    }).compile();

    service = module.get<RopeService>(RopeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
