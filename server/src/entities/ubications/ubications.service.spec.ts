import { Test, TestingModule } from '@nestjs/testing';
import { UbicationsService } from './ubications.service';

describe('UbicationsService', () => {
  let service: UbicationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UbicationsService],
    }).compile();

    service = module.get<UbicationsService>(UbicationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
