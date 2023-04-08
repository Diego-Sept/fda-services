import { Injectable, Logger, forwardRef, Inject, BadRequestException } from '@nestjs/common';
import { Fraction } from './entities/fraction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FractionResponseDto } from './dto/fraction-response.dto';
import { FractionRequestDto } from './dto/fraction-request.dto';
import { CreateClientFractionDto } from 'src/client-fraction/dto/create-client-fraction.dto';
import { ClientFraction } from 'src/client-fraction/entities/client-fraction.entity';
import { ClientFractionService } from 'src/client-fraction/client-fraction.service';
import { Client } from 'src/clients/entities/client.entity';
import { ClientsService } from 'src/clients/clients.service';
import { ClientResponseDTO } from 'src/clients/dto/response/ClientResponseDto';

@Injectable()
export class FractionsService {

	private readonly logger = new Logger(FractionsService.name);

	constructor(
		@InjectRepository(Fraction)
		private fractionsRepository: Repository<Fraction>,
		@Inject(forwardRef(() => ClientFractionService))
		private clientFractionService: ClientFractionService,
		@Inject(forwardRef(() => ClientsService))
		private clientService: ClientsService
	) { }

	async create(fractionRequestDto: FractionRequestDto) {
		let fractionCreated: Fraction = await this.fractionsRepository.save({ name: fractionRequestDto.name });

		for (let client of fractionRequestDto.clients) {
			this.addClientFraction(fractionCreated, client);
		}
		return await this.getFraction(fractionCreated);
	}

	async findAll() {
		let fractions: Fraction[] = await this.fractionsRepository.find();
		let clientFractions: FractionResponseDto[] = [];

		for (let fraction of fractions){
			let fractionResponseDto = await this.getFraction(fraction);
			clientFractions.push(fractionResponseDto)
		}

		return clientFractions;
	}

	async findOne(id: number) {
		return this.fractionsRepository.findOneBy({ id: id }).then(async fraction => {
			return await this.getFraction(fraction);
		})
	}

	async update(id: number, updateFractionDto: FractionRequestDto) {
		let fractionToUpdate: Fraction = await this.findOne(id);

		if (!!fractionToUpdate){
			if (fractionToUpdate.name != updateFractionDto.name){
				fractionToUpdate.name = updateFractionDto.name;
				await this.fractionsRepository.save(fractionToUpdate);
			}

			let clientFractions : ClientFraction[] = await this.clientFractionService.getByFractionId(id);
			let clientFractionsToDelete = clientFractions.filter(cf => !updateFractionDto.clients.map(client => client.id).includes(cf.clientId));
			let clientsToAdd = updateFractionDto.clients.filter(client => !clientFractions.map(cf => cf.clientId).includes(client.id));
			for (let cfd of clientFractionsToDelete) {
				await this.clientFractionService.remove(cfd.id);
			}
			for (let client of clientsToAdd) {
				this.addClientFraction(fractionToUpdate, client);
			}
		} else {
			throw new BadRequestException("No fraction found with id " + id);
		}

		return await this.getFraction(fractionToUpdate);
	}

	async remove(id: number) {
		let clientFractions : ClientFraction[] = await this.clientFractionService.getByFractionId(id);

		for (let cf of clientFractions){
			await this.clientFractionService.remove(cf.id);
		}

		return await this.fractionsRepository.delete(id);
	}

	async getFraction(fraction?: Fraction) {
		let fractionResponseDto : FractionResponseDto = {...fraction};
		let clientFractions : ClientFraction[] = await this.clientFractionService.getByFractionId(fraction.id);
		let clients : ClientResponseDTO[] = [];
		for (let cf of clientFractions){
			let client : ClientResponseDTO = await this.clientService.findOne(cf.clientId);
			clients.push(client);
		}
		fractionResponseDto.clients = clients;
		return fractionResponseDto;
	}

	async addClientFraction(fraction: Fraction, client: Client){
		const createClientFractionDto: CreateClientFractionDto = {
			clientId: client.id,
			fractionId: fraction.id
		}

		return await this.clientFractionService.create(createClientFractionDto);
	}

	async getClientFractions(clientId: number) {
        return await this.clientFractionService.getByClientId(clientId);
    }
}
