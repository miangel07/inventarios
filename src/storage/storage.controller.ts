import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors } from '@nestjs/common';
import { StorageService } from './storage.service';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { PaginationQueryDto } from 'src/utils/TypeGeneric';
import { InjectIdInterceptor } from 'src/pipes/inject-id-into-body.pipe';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) { }

  @Post()
  create(@Body() createStorageDto: CreateStorageDto) {
    return this.storageService.create(createStorageDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.storageService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(InjectIdInterceptor)
  update(@Param('id') id: string, @Body() updateDto: UpdateStorageDto) {
    return this.storageService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storageService.remove(+id);
  }
}
