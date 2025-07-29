import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from 'src/utils/TypeGeneric';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from 'src/common/guards/imgFilter';
import { editFileName } from 'src/utils/EditFileName';
import { diskStorage } from 'multer';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }
  @UseGuards(JwtAuthGuard)
  /* @Roles('admin', 'storage_admin') */
  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
      limits: { fileSize: 5 * 1024 * 1024 }, 
    }),
  )
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {

 
  return this.productsService.create(createProductDto, req.user, file);
  }

  @Get()
  /* @Roles('admin', 'storage_admin') */
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
  update(@Param('id') id: string, @Req() req: any, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
