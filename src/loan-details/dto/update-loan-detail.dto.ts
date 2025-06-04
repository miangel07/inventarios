import { PartialType } from '@nestjs/mapped-types';
import { CreateLoanDetailDto } from './create-loan-detail.dto';

export class UpdateLoanDetailDto extends PartialType(CreateLoanDetailDto) {}
