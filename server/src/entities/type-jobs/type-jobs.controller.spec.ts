import { Test, TestingModule } from '@nestjs/testing';
import { TypeJobsController } from './type-jobs.controller';
import { TypeJobsService } from './type-jobs.service';

describe('TypeJobsController', () => {
  let controller: TypeJobsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TypeJobsController],
      providers: [TypeJobsService],
    }).compile();

    controller = module.get<TypeJobsController>(TypeJobsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
