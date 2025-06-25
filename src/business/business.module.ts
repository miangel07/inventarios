import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigBusiness } from 'src/config-business/entities/config-business.entity';
import { Business } from './entities/business.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ConfigBusiness,
      Business
    ]),
  ],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [BusinessService],
})
export class BusinessModule { }
