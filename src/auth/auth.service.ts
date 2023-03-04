import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDTO } from './dto/login-dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

	constructor(
		private usersService: UsersService,
	) {}


	async login(loginDto: LoginDTO) {
		let user = await this.usersService.getUserByIdentificationNumber(loginDto.identificationNumber);

		if (!!user){
			return user;
		}

	}

}
