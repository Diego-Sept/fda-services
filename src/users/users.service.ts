import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { ClientsService } from 'src/clients/clients.service';
import { UserResponseDTO } from './dto/response/UserResponseDTO';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private rolesService: RolesService,
  )
  {}

  async create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    return await this.usersRepository.findOneBy({id: id});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user : User = await this.findOne(id);
    user.password = updateUserDto.password;
    if (updateUserDto.roleId){
      user.role = await this.rolesService.findOne(updateUserDto.roleId);
    } else if (updateUserDto.role){
      user.role = updateUserDto.role;
    }
    return await this.usersRepository.save(user);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }

  async getUserByClientId(clientId: number){
    return await this.getUserResponseDto(await this.usersRepository.findOneBy({clientId: clientId}));
  }

  async getUserResponseDto(user: User){
    let userResponseDTO : UserResponseDTO = {...user};
    userResponseDTO.role = await this.rolesService.findOne(user.roleId);
    return userResponseDTO;
  }
}
