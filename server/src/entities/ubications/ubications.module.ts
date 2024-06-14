import { Module } from '@nestjs/common';
import { UbicationsService } from './ubications.service';
import { UbicationsController } from './ubications.controller';

@Module({
  controllers: [UbicationsController],
  providers: [UbicationsService],
})
export class UbicationsModule {}
