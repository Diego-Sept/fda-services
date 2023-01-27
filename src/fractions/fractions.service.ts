import { Injectable } from '@nestjs/common';
import { CreateFractionDto } from './dto/create-fraction.dto';
import { UpdateFractionDto } from './dto/update-fraction.dto';

@Injectable()
export class FractionsService {
  create(createFractionDto: CreateFractionDto) {
    return 'This action adds a new fraction';
  }

  findAll() {
    return `This action returns all fractions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fraction`;
  }

  update(id: number, updateFractionDto: UpdateFractionDto) {
    return `This action updates a #${id} fraction`;
  }

  remove(id: number) {
    return `This action removes a #${id} fraction`;
  }
}
