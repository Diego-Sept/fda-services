import { Injectable, Logger } from '@nestjs/common';
import { CreateSaloonDto } from './dto/create-saloon.dto';
import { UpdateSaloonDto } from './dto/update-saloon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saloon } from './entities/saloon.entity';

@Injectable()
export class SaloonsService {
 
  private readonly logger = new Logger(SaloonsService.name);

  constructor(
    @InjectRepository(Saloon)
    private saloonRepository: Repository<Saloon>
  ){}

  async create(createSaloonDto: CreateSaloonDto) {
    return await this.saloonRepository.save(createSaloonDto);
  }

  async findAll() {
    return await this.saloonRepository.find();
  }

  async findOne(id: number) {
    return await this.saloonRepository.findOneBy({id: id});
  }

  async update(id: number, updateSaloonDto: UpdateSaloonDto) {
    let saloonToUpdate : Saloon = await this.findOne(id);

    if (!!saloonToUpdate){
      saloonToUpdate.name = updateSaloonDto.name;
    } 
        
    return await this.saloonRepository.save(saloonToUpdate);
  }

  async remove(id: number) {
    return await this.saloonRepository.delete(id);
  }
}
