import { Injectable } from '@nestjs/common';
import { CreateClientFractionDto } from './dto/create-client-fraction.dto';
import { UpdateClientFractionDto } from './dto/update-client-fraction.dto';

@Injectable()
export class ClientFractionService {
  create(createClientFractionDto: CreateClientFractionDto) {
    return 'This action adds a new clientFraction';
  }

  findAll() {
    return `This action returns all clientFraction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientFraction`;
  }

  update(id: number, updateClientFractionDto: UpdateClientFractionDto) {
    return `This action updates a #${id} clientFraction`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientFraction`;
  }
}
