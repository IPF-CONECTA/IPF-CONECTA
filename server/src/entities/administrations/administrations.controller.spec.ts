import { Test, TestingModule } from '@nestjs/testing';
import { AdministrationsController } from './administrations.controller';
import { AdministrationsService } from './administrations.service';

describe('AdministrationsController', () => {
  let controller: AdministrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdministrationsController],
      providers: [AdministrationsService],
    }).compile();

    controller = module.get<AdministrationsController>(AdministrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
