import { Module } from '@nestjs/common';
import { ConfigBusinessService } from './config-business.service';
import { ConfigBusinessController } from './config-business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigBusiness } from './entities/config-business.entity';
import { Business } from 'src/business/entities/business.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConfigBusiness,
      Business
    ]),
  ],
  controllers: [ConfigBusinessController],
  providers: [ConfigBusinessService],
  exports: [ConfigBusinessService],
})
export class ConfigBusinessModule { }
