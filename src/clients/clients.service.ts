import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
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

		clientResponseDto.contacts = [];
		if (!!clientDto?.contacts) {
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

	async update(id: number, updateClientDto: UpdateClientDto) {

		return await this.clientsRepository.save(updateClientDto);
	}

	async remove(id: number) {
		return await this.clientsRepository.delete(id);
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
