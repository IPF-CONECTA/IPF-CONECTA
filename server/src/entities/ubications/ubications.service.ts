import { Injectable } from '@nestjs/common';
import { CreateUbicationDto } from './dto/create-ubication.dto';
import { UpdateUbicationDto } from './dto/update-ubication.dto';

@Injectable()
export class UbicationsService {
  create(createUbicationDto: CreateUbicationDto) {
    return 'This action adds a new ubication';
  }

  findAll() {
    return `This action returns all ubications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ubication`;
  }

  update(id: number, updateUbicationDto: UpdateUbicationDto) {
    return `This action updates a #${id} ubication`;
  }

  remove(id: number) {
    return `This action removes a #${id} ubication`;
  }
}
