import { Module } from '@nestjs/common';
import { TypeJobsService } from './type-jobs.service';
import { TypeJobsController } from './type-jobs.controller';

@Module({
  controllers: [TypeJobsController],
  providers: [TypeJobsService],
})
export class TypeJobsModule {}
