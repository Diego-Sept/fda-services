import { forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { RolesService } from '../roles/roles.service';
import { UserResponseDTO } from './dto/response/UserResponseDTO';

@Injectable()
export class UsersService {

	private readonly logger = new Logger(UsersService.name);

	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>,
		private rolesService: RolesService,
	) { }

	async create(createUserDto: CreateUserDto) {
		return await this.getUserResponseDto(await this.usersRepository.save(createUserDto));
	}

	async findAll() {
		let users: User[] = await this.usersRepository.find();

		let usersResponse: UserResponseDTO[] = [];

		for (let user of users) {
			let userResponseDTO = await this.getUserResponseDto(user);
			usersResponse.push(userResponseDTO);
		}

		return usersResponse;
	}

	async findOne(id: number) {
		return this.usersRepository.findOneBy({ id: id }).then(async user => {
			return await this.getUserResponseDto(user);
		});
	}

	async remove(id: number) {
		return await this.usersRepository.delete(id);
	}

	async getUserByClientId(clientId: number) {
		return await this.getUserResponseDto(await this.usersRepository.findOneBy({ clientId: clientId }));
	}

	async getUserResponseDto(user: User) {
		let userResponseDTO: UserResponseDTO = { ...user };
		userResponseDTO.role = await this.rolesService.findOne(user.roleId);
		return userResponseDTO;
	}

	async getUserByIdentificationNumber(identificationNumber: string) {
		return await this.getUserResponseDto(await this.usersRepository.findOneBy({ username: identificationNumber }));
	}
}
