import { Test, TestingModule } from '@nestjs/testing';
import { UbicationsController } from './ubications.controller';
import { UbicationsService } from './ubications.service';

describe('UbicationsController', () => {
  let controller: UbicationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UbicationsController],
      providers: [UbicationsService],
    }).compile();

    controller = module.get<UbicationsController>(UbicationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
