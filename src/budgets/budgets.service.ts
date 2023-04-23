import { BadRequestException, forwardRef, Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientFractionService } from 'src/client-fraction/client-fraction.service';
import { ClientsService } from 'src/clients/clients.service';
import { EventTypesService } from 'src/event-types/event-types.service';
import { Fraction } from 'src/fractions/entities/fraction.entity';
import { FractionsService } from 'src/fractions/fractions.service';
import { SaloonsService } from 'src/saloons/saloons.service';
import { Repository } from 'typeorm';
import { BudgetRequestDto } from './dto/budget-request.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';
import { EventsService } from 'src/events/events.service';
import { ApiConflictResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Injectable()
export class BudgetsService {

	private readonly logger = new Logger(BudgetsService.name);

	constructor(
		@InjectRepository(Budget)
		private budgetsRepository: Repository<Budget>,
		@Inject(forwardRef(() => ClientFractionService))
		private clientFractionService: ClientFractionService,
		@Inject(forwardRef(() => ClientsService))
		private clientService: ClientsService,
		@Inject(forwardRef(() => FractionsService))
		private fractionService: FractionsService,
		@Inject(forwardRef(() => SaloonsService))
		private saloonsService: SaloonsService,
		@Inject(forwardRef(() => EventTypesService))
		private eventTypesService: EventTypesService,
		@Inject(forwardRef(() => EventsService))
		private eventsService: EventsService,
	) { }

	async create(budgetRequestDto: BudgetRequestDto) {
		if (!budgetRequestDto.amount){
			this.logger.error("Amount is required");
			throw new BadRequestException("El monto es requerido.");
		}
		let eventCreated = null;
		this.eventsService.create(budgetRequestDto.event).then(event => {
			eventCreated = event;
		}).catch(e => {
			this.logger.error("An error ocurred at create event.", e);
			throw new BadRequestException("Ha ocurrido un error al crear el evento.");
		})
		let budgetCreated = null;
		if (!!eventCreated){
			let createBudgetDto : CreateBudgetDto = {
				amount: budgetRequestDto.amount,
				event: eventCreated
			}
			this.budgetsRepository.save(createBudgetDto).then(budget => {
				
			})
		}

		return await budgetCreated;
	}

	async findAll() {
		return await `This action returns all budgets`;
	}

	async findOne(id: number) {
		return await `This action returns a #${id} budget`;
	}

	async update(id: number, updateBudgetDto: UpdateBudgetDto) {
		return await `This action updates a #${id} budget`;
	}

	async remove(id: number) {
		return await `This action removes a #${id} budget`;
	}

	async getBudget(id : number){

	}
}
