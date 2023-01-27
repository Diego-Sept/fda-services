import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientDto } from './dto/client-dto';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { ContactsService } from '../contacts/contacts.service';
import * as generator from 'generate-password';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ClientResponseDTO } from './dto/response/ClientResponseDto';
import { Contact } from '../contacts/entities/contact.entity';
import { User } from 'src/users/entities/user.entity';
import { resolve } from 'path';
import { RolesService } from '../roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    @Inject(forwardRef(() => ContactsService))
    private contactsService: ContactsService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    @Inject(forwardRef(() => RolesService))
    private rolesService: RolesService,
  )
  {}

  async create(clientDto: ClientDto) {
    debugger;
    let client: Client =  await this.clientsRepository.save(clientDto.clientData);

    let clientResponseDto : ClientResponseDTO = {...client};

    if (!!clientDto.contacts){
      let contacts : Contact[] = [];
      clientDto.contacts.forEach(contact => {
        contact.client = client;
        this.contactsService.create(contact).then(newContact => {
          contacts.push(newContact);  
        });
      })
      clientResponseDto.contacts = contacts;
    }

    
    let roleReturned : Role = await this.rolesService.findOne(clientDto.roleId);

    let createUserDto : CreateUserDto = {
      username: clientDto.clientData.identificationNumber,
      role: roleReturned,
      password: generator.generate({
        length: 8,
        numbers: true,
        uppercase: false,
        symbols: false
      }),
      client: client
    }

    let user = await this.usersService.create(createUserDto);
    clientResponseDto.user = user;

    return clientResponseDto;
  }

  async findAll() {
    let clients : Client[] = await this.clientsRepository.find();
    
    let clientsResponse : ClientResponseDTO[] = [];

    for (let client of clients){
      let clientResponseDTO = await this.getClientDto(client);
      clientsResponse.push(clientResponseDTO);
    }
    
    return clientsResponse;
  }

  async findOne(id: number) {
    return this.clientsRepository.findOneBy({id: id}).then(async client => {
      return await this.getClientDto(client);
    })
  }

  async update(id: number, updateClientDto: UpdateClientDto) {

    return await this.clientsRepository.save(updateClientDto);
  }

  async remove(id: number) {
    return await this.clientsRepository.delete(id);
  }

  async getClientDto(client : Client) : Promise<ClientResponseDTO> {
    let clientResponseDto : ClientResponseDTO = {
      ...client,
    };
    clientResponseDto.contacts = await this.contactsService.getContactsByClientId(client.id);
    clientResponseDto.user = await this.usersService.getUserByClientId(client.id);

    return clientResponseDto;
  }
}
