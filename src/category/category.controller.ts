import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, Req } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationQueryDto, StatusGeneric } from 'src/utils/TypeGeneric';
import { InjectIdInterceptor } from 'src/pipes/inject-id-into-body.pipe';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto, @Req() req: any) {
    return this.categoryService.findAll(query,req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(InjectIdInterceptor)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: StatusGeneric) {
    return this.categoryService.updateStatus(+id, status);
  }
}
