import { BadRequestException, forwardRef, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BudgetRequestDto } from './dto/budget-request.dto';
import { Budget } from './entities/budget.entity';
import { EventsService } from 'src/events/events.service';
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
		let budgets : Budget[] = await this.budgetsRepository.find();

		let budgetsResponse : BudgetResponseDto[] = [];

		for (let budget of budgets){
			budgetsResponse.push(await this.getBudget(budget));
		}

		return await budgetsResponse;
	}

	async findOne(id: number, compose: boolean = false) {
		return await this.budgetsRepository.findOneBy({ id: id }).then(async budget => {
			if (!!compose){
				return await this.getBudget(budget);
			} else {
				return await budget;
			}
		})
	}

	async update(id: number, budgetRequestDto: BudgetRequestDto) {
		let budgetToUpdate : Budget = await this.budgetsRepository.findOneBy({ id: id });

		let budgetUpdated = undefined;

		if (!!budgetToUpdate){
			if (!!budgetRequestDto?.event){
				await this.eventsService.update(budgetRequestDto.event.id, budgetRequestDto.event)
			}
			let budget  : Budget = {
				id: budgetToUpdate.id,
				createdAt: budgetToUpdate.createdAt,
				expirationDate: budgetToUpdate.expirationDate,
				eventId: budgetToUpdate.eventId,
				event: budgetToUpdate.event,
				amount: budgetRequestDto.amount
			}

			budgetUpdated = await this.budgetsRepository.save(budget);
		} else {
			this.logger.error("The budget with id " + id + " couldn't been found.");
			return new NotFoundException("The budget with id " + id + " couldn't been found.");
		}

		return await this.getBudget(budgetUpdated);
	}

	async remove(id: number) {
		let budget: Budget = await this.budgetsRepository.findOneBy({ id: id });

		if (!!budget) {
			this.eventsService.remove(budget.eventId);
		} else {
			this.logger.error("The budget with id " + id + " couldn't been found.");
			return new NotFoundException("The budget with id " + id + " couldn't been found.");
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
