import { Test, TestingModule } from '@nestjs/testing';
import { RawMaterialTypeService } from './raw-material-type.service';

describe('RawMaterialTypeService', () => {
  let service: RawMaterialTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RawMaterialTypeService],
    }).compile();

    service = module.get<RawMaterialTypeService>(RawMaterialTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
