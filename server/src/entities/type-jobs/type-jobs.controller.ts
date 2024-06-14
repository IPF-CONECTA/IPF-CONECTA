import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeJobsService } from './type-jobs.service';
import { CreateTypeJobDto } from './dto/create-type-job.dto';
import { UpdateTypeJobDto } from './dto/update-type-job.dto';

@Controller('type-jobs')
export class TypeJobsController {
  constructor(private readonly typeJobsService: TypeJobsService) {}

  @Post()
  create(@Body() createTypeJobDto: CreateTypeJobDto) {
    return this.typeJobsService.create(createTypeJobDto);
  }

  @Get()
  findAll() {
    return this.typeJobsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeJobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeJobDto: UpdateTypeJobDto) {
    return this.typeJobsService.update(+id, updateTypeJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeJobsService.remove(+id);
  }
}
