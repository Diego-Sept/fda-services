import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger(ProductsService.name);

  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    return await this.productsRepository.save(createProductDto);
  }

  async findAll() {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    return await this.productsRepository.findOneBy({id: id});
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    let productToUpdate : Product = await this.findOne(id);

    if (!!productToUpdate){
      productToUpdate.name = updateProductDto.name;
    } 
        
    return await this.productsRepository.save(productToUpdate);
  }

  async remove(id: number) {
    return await this.productsRepository.delete(id);
  }
}
