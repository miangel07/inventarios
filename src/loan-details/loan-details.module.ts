import { Module } from '@nestjs/common';
import { LoanDetailsService } from './loan-details.service';
import { LoanDetailsController } from './loan-details.controller';

@Module({
  controllers: [LoanDetailsController],
  providers: [LoanDetailsService],
})
export class LoanDetailsModule {}
