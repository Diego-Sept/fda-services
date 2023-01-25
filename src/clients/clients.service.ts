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

@Injectable()
export class ClientsService {

  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
    @Inject(forwardRef(() => ContactsService))
    private contactsService: ContactsService,
    private usersService: UsersService,
  )
  {}

  async create(clientDto: ClientDto) {
    debugger;
    let client: Client =  await this.clientsRepository.save(clientDto.clientData);

    let clientResponseDto : ClientResponseDTO = {...client};

    if (!!clientDto.contacts){
      let contacts : Contact[] = [];
      clientDto.contacts.forEach(contact => {
        contact.clientId = client.id;
        this.contactsService.create(contact).then(newContact => {
          contacts.push(newContact);  
        });
      })
      clientResponseDto.contacts = contacts;
    }

    let createUserDto : CreateUserDto = {
      username: clientDto.clientData.identificationNumber,
      roleId: clientDto.roleId,
      password: generator.generate({
        length: 8,
        numbers: true,
        uppercase: false,
        symbols: false
      }),
      clientId: client.id
    }

    let user = await this.usersService.create(createUserDto);
    clientResponseDto.user = user;

    return clientResponseDto;
  }

  async findAll() {
    return await this.clientsRepository.find();
  }

  async findOne(id: number) {
    return await this.clientsRepository.findOneBy({id: id});
  }

  async update(id: number, updateClientDto: UpdateClientDto) {

    return await this.clientsRepository.save(updateClientDto);
  }

  async remove(id: number) {
    return await this.clientsRepository.delete(id);
  }
}
