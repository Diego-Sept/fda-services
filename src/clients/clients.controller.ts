import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { ClientDto } from './dto/client-dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@ApiTags('Clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() clientDto: ClientDto) {
    return this.clientsService.create(clientDto);
  }

  @Get()
  async findAll() {
    return await this.clientsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.clientsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() clientDto: ClientDto) {
    return await this.clientsService.update(+id, clientDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.clientsService.remove(+id);
  }
}
