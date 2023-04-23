import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DuesService } from './dues.service';
import { CreateDueDto } from './dto/create-due.dto';
import { UpdateDueDto } from './dto/update-due.dto';

@Controller('dues')
export class DuesController {
  constructor(private readonly duesService: DuesService) {}

  @Post()
  create(@Body() createDueDto: CreateDueDto) {
    return this.duesService.create(createDueDto);
  }

  @Get()
  findAll() {
    return this.duesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.duesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDueDto: UpdateDueDto) {
    return this.duesService.update(+id, updateDueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.duesService.remove(+id);
  }
}
