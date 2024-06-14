import { Injectable } from '@nestjs/common';
import { CreateTypeJobDto } from './dto/create-type-job.dto';
import { UpdateTypeJobDto } from './dto/update-type-job.dto';

@Injectable()
export class TypeJobsService {
  create(createTypeJobDto: CreateTypeJobDto) {
    return 'This action adds a new typeJob';
  }

  findAll() {
    return `This action returns all typeJobs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} typeJob`;
  }

  update(id: number, updateTypeJobDto: UpdateTypeJobDto) {
    return `This action updates a #${id} typeJob`;
  }

  remove(id: number) {
    return `This action removes a #${id} typeJob`;
  }
}
