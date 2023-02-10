import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientFractionService } from './client-fraction.service';
import { CreateClientFractionDto } from './dto/create-client-fraction.dto';
import { UpdateClientFractionDto } from './dto/update-client-fraction.dto';

@Controller('client-fraction')
export class ClientFractionController {
  constructor(private readonly clientFractionService: ClientFractionService) {}

  @Post()
  create(@Body() createClientFractionDto: CreateClientFractionDto) {
    return this.clientFractionService.create(createClientFractionDto);
  }

  @Get()
  findAll() {
    return this.clientFractionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientFractionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientFractionDto: UpdateClientFractionDto) {
    return this.clientFractionService.update(+id, updateClientFractionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientFractionService.remove(+id);
  }
}
