import { Test, TestingModule } from '@nestjs/testing';
import { MainCustomerController } from './main-customer.controller';

describe('MainCustomerController', () => {
  let controller: MainCustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainCustomerController],
    }).compile();

    controller = module.get<MainCustomerController>(MainCustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
