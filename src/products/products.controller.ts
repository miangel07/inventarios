import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from 'src/utils/TypeGeneric';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @UseGuards(JwtAuthGuard)
  @Roles('admin', 'storage_admin')
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Req() req: any,) {
    return this.productsService.create(createProductDto, req.user);
  }

  @Get()
  @Roles('admin', 'storage_admin')
  async findAll(
    @Query() pagination: PaginationQueryDto,
    @Req() req: any,
  ) {
    return this.productsService.findAll(pagination, req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
