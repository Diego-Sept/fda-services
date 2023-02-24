import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('stores')
@ApiTags("Stores")
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto) {
    return await this.storesService.create(createStoreDto);
  }

  @Get()
  async findAll() {
    return await this.storesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.storesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return await this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.storesService.remove(+id);
  }
}
