import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsService } from '../clients/clients.service';

@Injectable()
export class ContactsService {

  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @Inject(forwardRef(() => ClientsService))
    private clientsService: ClientsService,
  )
  {}

  async create(createContactDto: CreateContactDto) : Promise<Contact> {
    return await this.contactRepository.save(createContactDto);
  }

  async findAll() {
    return await this.contactRepository.find();
  }

  async findOne(id: number) {
    return await this.contactRepository.findOneBy({id: id});
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    let contactToUpdate : Contact = await this.findOne(id);
    contactToUpdate.name = updateContactDto.name;
    contactToUpdate.phone = updateContactDto.phone;
    contactToUpdate.email = updateContactDto.email;
    contactToUpdate.mainContact = updateContactDto.mainContact;

    return await this.contactRepository.save(contactToUpdate);
  }

  async remove(id: number) {
    return await this.contactRepository.delete({id: id})
  }

  async getContactsByClientId(clientId: number){
    return this.contactRepository.findBy({clientId: clientId});
  }
}
