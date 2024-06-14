import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdministrationsModule } from './administrations/administrations.module';

@Module({
  imports: [AdministrationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
