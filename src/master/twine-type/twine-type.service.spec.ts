import { Test, TestingModule } from '@nestjs/testing';
import { TwineTypeService } from './twine-type.service';

describe('TwineTypeService', () => {
  let service: TwineTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TwineTypeService],
    }).compile();

    service = module.get<TwineTypeService>(TwineTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
