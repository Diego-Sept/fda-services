import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FractionsService } from './fractions.service';
import { CreateFractionDto } from './dto/create-fraction.dto';
import { UpdateFractionDto } from './dto/update-fraction.dto';

@Controller('fractions')
export class FractionsController {
  constructor(private readonly fractionsService: FractionsService) {}

  @Post()
  create(@Body() createFractionDto: CreateFractionDto) {
    return this.fractionsService.create(createFractionDto);
  }

  @Get()
  findAll() {
    return this.fractionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fractionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFractionDto: UpdateFractionDto) {
    return this.fractionsService.update(+id, updateFractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fractionsService.remove(+id);
  }
}
