import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
import { CreateClientFractionDto } from './dto/create-client-fraction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientFraction } from './entities/client-fraction.entity';
import { FractionsService } from 'src/fractions/fractions.service';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class ClientFractionService {

	private readonly logger = new Logger(ClientFractionService.name);

	constructor(
		@InjectRepository(ClientFraction)
		private clientFractionRepository: Repository<ClientFraction>,
	) { }

	async create(createClientFractionDto: CreateClientFractionDto) {
		let clientFraction: ClientFraction = await this.clientFractionRepository.save(createClientFractionDto);
		return clientFraction;
	}

	async findAll() {
		return await this.clientFractionRepository.find();
	}

	async findOne(id: number) {
		return await this.clientFractionRepository.findOneBy({ id: id });
	}

	async remove(id: number) {
		return await this.clientFractionRepository.delete(id);
	}

	async getByFractionId(fractionId: number){
		return await this.clientFractionRepository.findBy({fractionId: fractionId});
	}

	async getByClientId(clientId: number) {
		return await this.clientFractionRepository.findOne({ where: { clientId } });
	}
}
