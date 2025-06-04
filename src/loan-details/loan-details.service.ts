import { Injectable } from '@nestjs/common';
import { CreateLoanDetailDto } from './dto/create-loan-detail.dto';
import { UpdateLoanDetailDto } from './dto/update-loan-detail.dto';

@Injectable()
export class LoanDetailsService {
  create(createLoanDetailDto: CreateLoanDetailDto) {
    return 'This action adds a new loanDetail';
  }

  findAll() {
    return `This action returns all loanDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loanDetail`;
  }

  update(id: number, updateLoanDetailDto: UpdateLoanDetailDto) {
    return `This action updates a #${id} loanDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} loanDetail`;
  }
}
