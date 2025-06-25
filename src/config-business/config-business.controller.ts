import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConfigBusinessService } from './config-business.service';
import { CreateConfigBusinessDto } from './dto/create-config-business.dto';
import { UpdateConfigBusinessDto } from './dto/update-config-business.dto';

@Controller('config-business')
export class ConfigBusinessController {
  constructor(private readonly configBusinessService: ConfigBusinessService) {}

  @Post()
  create(@Body() createConfigBusinessDto: CreateConfigBusinessDto) {
    return this.configBusinessService.create(createConfigBusinessDto);
  }

  @Get()
  findAll() {
    return this.configBusinessService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configBusinessService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConfigBusinessDto: UpdateConfigBusinessDto) {
    return this.configBusinessService.update(+id, updateConfigBusinessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configBusinessService.remove(+id);
  }
}
