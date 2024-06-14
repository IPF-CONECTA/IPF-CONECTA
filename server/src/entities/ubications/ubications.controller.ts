import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UbicationsService } from './ubications.service';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { UpdateUbicationDto } from './dto/update-ubication.dto';

@Controller('ubications')
export class UbicationsController {
  constructor(private readonly ubicationsService: UbicationsService) {}

  @Post()
  create(@Body() createUbicationDto: CreateUbicationDto) {
    return this.ubicationsService.create(createUbicationDto);
  }

  @Get()
  findAll() {
    return this.ubicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ubicationsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUbicationDto: UpdateUbicationDto) {
    return this.ubicationsService.update(+id, updateUbicationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ubicationsService.remove(+id);
  }
}
