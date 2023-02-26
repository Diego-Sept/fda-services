import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientDto } from './dto/client-dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { ContactsService } from '../contacts/contacts.service';
import * as generator from 'generate-password';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { ClientResponseDTO } from './dto/response/ClientResponseDto';
import { RolesService } from '../roles/roles.service';
import { Role } from 'src/roles/entities/role.entity';
import { NotFoundException } from '@nestjs/common/exceptions';

@Injectable()
export class ClientsService {

	private readonly logger = new Logger(ClientsService.name);

	constructor(
		@InjectRepository(Client)
		private clientsRepository: Repository<Client>,
		@Inject(forwardRef(() => ContactsService))
		private contactsService: ContactsService,
		@Inject(forwardRef(() => UsersService))
		private usersService: UsersService,
		@Inject(forwardRef(() => RolesService))
		private rolesService: RolesService,
	) { }

	async create(clientDto: ClientDto) {
		let client: Client = await this.clientsRepository.save(clientDto.clientData);
		this.logger.log("Cliente al guardar", client);

		let clientResponseDto: ClientResponseDTO = { ...client };

		if (!!clientDto?.contacts) {
			clientResponseDto.contacts = [];
			for(let contact of clientDto.contacts){
				contact.client = client;
				let contactResponse = await this.contactsService.create(contact);
				this.logger.log("Contacto: ", contactResponse);
				clientResponseDto.contacts.push(contactResponse);
				this.logger.log("Cliente de respuesta contacto: ", clientResponseDto);
			}
		}

		let roleReturned: Role = await this.rolesService.findOne(clientDto.roleId);

		let createUserDto: CreateUserDto = {
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
		this.logger.log("Cliente de respuesta: ", clientResponseDto);

		return await clientResponseDto;
	}

	async findAll() {
		let clients: Client[] = await this.clientsRepository.find();

		let clientsResponse: ClientResponseDTO[] = [];

		for (let client of clients) {
			let clientResponseDTO = await this.getClientDto(client);
			clientsResponse.push(clientResponseDTO);
		}

		return clientsResponse;
	}

	async findOne(id: number) {
		return this.clientsRepository.findOneBy({ id: id }).then(async client => {
			return await this.getClientDto(client);
		})
	}

	async update(id: number, clientDto: ClientDto) {
		let clientResponseDto = new ClientResponseDTO();
		let client = await this.clientsRepository.findOneBy({ id: id });

		if (!!client){
			client.address = clientDto.clientData.address;
			client.guestsQuantity = clientDto.clientData.guestsQuantity;
			client.identificationNumber = clientDto.clientData.identificationNumber;
			client.name = clientDto.clientData.name;
			client.surname = clientDto.clientData.surname;
			client = await this.clientsRepository.save(client);

			let contacts = await this.contactsService.getContactsByClientId(id);
			if (!!contacts){
				contacts[0].name = clientDto.contacts[0].name;
				contacts[0].phone = clientDto.contacts[0].phone;
				contacts[0].email = clientDto.contacts[0].email;
				contacts[1].name = clientDto.contacts[1].name;
				contacts[1].phone = clientDto.contacts[1].phone;
				contacts[1].email = clientDto.contacts[1].email;
				for (let contact of contacts){
					this.contactsService.update(contact.id, contact);
				}
			}
		}

		clientResponseDto = await this.getClientDto(client);
		return clientResponseDto;
	}

	async remove(id: number) {
		let client : ClientResponseDTO = await this.findOne(id);
		
		if (!!client){ 
			if (!!client.contacts){
				for (let contact of client.contacts){
					await this.contactsService.remove(contact.id);
				}
			}
			
			if (!!client.user){
				await this.usersService.remove(client.user.id);
			}

			await this.clientsRepository.delete(id);
		} else {
			return new NotFoundException("The client with id " + id + " couldn't been found.");
		}
	}

	async getClientDto(client: Client): Promise<ClientResponseDTO> {
		let clientResponseDto: ClientResponseDTO = {
			...client,
		};
		clientResponseDto.contacts = await this.contactsService.getContactsByClientId(client.id);
		clientResponseDto.user = await this.usersService.getUserByClientId(client.id);

		return clientResponseDto;
	}
}
