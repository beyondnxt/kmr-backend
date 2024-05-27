import { Test, TestingModule } from '@nestjs/testing';
import { RopeMachineService } from './rope-machine.service';

describe('RopeMachineService', () => {
  let service: RopeMachineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RopeMachineService],
    }).compile();

    service = module.get<RopeMachineService>(RopeMachineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
