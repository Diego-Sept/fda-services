import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaloonsService } from './saloons.service';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { UpdateSaloonDto } from './dto/update-saloon.dto';

@Controller('saloons')
export class SaloonsController {
  constructor(private readonly saloonsService: SaloonsService) {}

  @Post()
  create(@Body() createSaloonDto: CreateSaloonDto) {
    return this.saloonsService.create(createSaloonDto);
  }

  @Get()
  findAll() {
    return this.saloonsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saloonsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaloonDto: UpdateSaloonDto) {
    return this.saloonsService.update(+id, updateSaloonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saloonsService.remove(+id);
  }
}
