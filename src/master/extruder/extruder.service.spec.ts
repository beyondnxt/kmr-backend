import { Test, TestingModule } from '@nestjs/testing';
import { ExtruderService } from './extruder.service';

describe('ExtruderService', () => {
  let service: ExtruderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtruderService],
    }).compile();

    service = module.get<ExtruderService>(ExtruderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
