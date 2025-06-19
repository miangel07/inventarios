import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { MeasureUnitService } from './measure-unit.service';
import { CreateMeasureUnitDto } from './dto/create-measure-unit.dto';
import { UpdateMeasureUnitDto } from './dto/update-measure-unit.dto';
import { PaginationQueryDto, StatusGeneric } from 'src/utils/TypeGeneric';
import { InjectIdInterceptor } from 'src/pipes/inject-id-into-body.pipe';

@Controller('measure-unit')
export class MeasureUnitController {
  constructor(private readonly measureUnitService: MeasureUnitService) { }

  @Post()
  create(@Body() createMeasureUnitDto: CreateMeasureUnitDto) {
    return this.measureUnitService.create(createMeasureUnitDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.measureUnitService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.measureUnitService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(InjectIdInterceptor)
  update(@Param('id') id: string, @Body() updateMeasureUnitDto: UpdateMeasureUnitDto) {
    return this.measureUnitService.update(+id, updateMeasureUnitDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: StatusGeneric) {
    return this.measureUnitService.updateStatus(+id, status);
  }
}
