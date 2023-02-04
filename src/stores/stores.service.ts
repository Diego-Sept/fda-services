import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Store } from './entities/store.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class StoresService {

  private readonly logger = new Logger(StoresService.name);

  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>
  ){}

  async create(createStoreDto: CreateStoreDto) {
    return await this.storesRepository.save(createStoreDto);
  }

  async findAll() {
    return await this.storesRepository.find();
  }

  async findOne(id: number) {
    return await this.storesRepository.findOneBy({id: id});
  }

  async update(id: number, updateStoreDto: UpdateStoreDto) {
    let store : Store = await this.findOne(id);

    if (!!store){
      if(!!updateStoreDto && !!updateStoreDto.name){
        store.name = updateStoreDto.name;
      } else {
        throw new BadRequestException("The name of the store must be sended.");
      }
    } else {
      throw new NotFoundException("No inventory found with id " + id);
    }

    return await this.storesRepository.save(store);
  }

  async remove(id: number) {
    return await this.storesRepository.delete(id);
  }
}
