import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoanDetailsService } from './loan-details.service';
import { CreateLoanDetailDto } from './dto/create-loan-detail.dto';
import { UpdateLoanDetailDto } from './dto/update-loan-detail.dto';

@Controller('loan-details')
export class LoanDetailsController {
  constructor(private readonly loanDetailsService: LoanDetailsService) {}

  @Post()
  create(@Body() createLoanDetailDto: CreateLoanDetailDto) {
    return this.loanDetailsService.create(createLoanDetailDto);
  }

  @Get()
  findAll() {
    return this.loanDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loanDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoanDetailDto: UpdateLoanDetailDto) {
    return this.loanDetailsService.update(+id, updateLoanDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loanDetailsService.remove(+id);
  }
}
