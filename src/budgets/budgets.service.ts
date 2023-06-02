import { BadRequestException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
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
import moment from 'moment';
import { BudgetResponseDto } from './dto/budget-response.dto';

@Injectable()
export class BudgetsService {

	private readonly logger = new Logger(BudgetsService.name);

	constructor(
		@InjectRepository(Budget)
		private budgetsRepository: Repository<Budget>,
		@Inject(forwardRef(() => EventsService))
		private eventsService: EventsService,
	) { }

	async create(budgetRequestDto: BudgetRequestDto) {
		if (!budgetRequestDto.amount) {
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
		if (!!eventCreated) {
			let createBudgetDto: CreateBudgetDto = {
				createdAt: moment().toDate(),
				amount: budgetRequestDto.amount,
				event: eventCreated,
				expirationDate: moment().add(30, "days").toDate()
			}
			budgetCreated = await this.budgetsRepository.save(createBudgetDto);
		}

		return await budgetCreated;
	}

	async findAll() {
		return await `This action returns all budgets`;
	}

	async findOne(id: number) {
		return await this.budgetsRepository.findOneBy({ id: id });
	}

	async update(id: number, updateBudgetDto: UpdateBudgetDto) {
		return await `This action updates a #${id} budget`;
	}

	async remove(id: number) {
		let budget: Budget = await this.findOne(id);

		if (!!budget) {
			this.eventsService.remove(budget.eventId);
		} else {
			this.logger.error("The buidget with id " + id + " couldn't been found.");
			return new NotFoundException("The buidget with id " + id + " couldn't been found.");
		}

		return await this.budgetsRepository.delete(id);
	}

	async getBudget(budget: Budget) {
		let budgetResponseDto: BudgetResponseDto = {
			id: budget.id,
			amount: budget.amount,
			createdAt: budget.createdAt,
			eventId: budget.eventId,
			expirationDate: budget.expirationDate
		};

		budgetResponseDto.event = await this.eventsService.findOne(budget.eventId);

		return budgetResponseDto;
	}
}
