import { Test, TestingModule } from '@nestjs/testing';
import { TypeJobsService } from './type-jobs.service';

describe('TypeJobsService', () => {
  let service: TypeJobsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TypeJobsService],
    }).compile();

    service = module.get<TypeJobsService>(TypeJobsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
