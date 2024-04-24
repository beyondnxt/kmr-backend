import { Test, TestingModule } from '@nestjs/testing';
import { MainCustomerService } from './main-customer.service';

describe('MainCustomerService', () => {
  let service: MainCustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainCustomerService],
    }).compile();

    service = module.get<MainCustomerService>(MainCustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
