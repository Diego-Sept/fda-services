import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  )
  {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.rolesRepository.save(createRoleDto);
  }

  async findAll() {
    return await this.rolesRepository.find();
  }

  async findOne(id: number) {
    return await this.rolesRepository.findOneBy({id: id})
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    let roleToUpdate = await this.findOne(id);

    if (!!roleToUpdate){
      roleToUpdate.name = updateRoleDto.name;
    } else {
      throw new BadRequestException("El rol no ha sido encontrado en la base de datos.");
    }

    return await this.rolesRepository.save(roleToUpdate);
  }

  async remove(id: number) {
    return await this.rolesRepository.delete({id: id})
  }
}
