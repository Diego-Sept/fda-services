import { Injectable } from '@nestjs/common';
import { CreateDueDto } from './dto/create-due.dto';
import { UpdateDueDto } from './dto/update-due.dto';

@Injectable()
export class DuesService {
  create(createDueDto: CreateDueDto) {
    return 'This action adds a new due';
  }

  findAll() {
    return `This action returns all dues`;
  }

  findOne(id: number) {
    return `This action returns a #${id} due`;
  }

  update(id: number, updateDueDto: UpdateDueDto) {
    return `This action updates a #${id} due`;
  }

  remove(id: number) {
    return `This action removes a #${id} due`;
  }
}
