import { Inject, Injectable, Logger, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePaymentPlanDto } from './dto/create-payment-plan.dto';
import { UpdatePaymentPlanDto } from './dto/update-payment-plan.dto';
import { PaymentPlan } from './entities/payment-plan.entity';
import { ClientsService } from 'src/clients/clients.service';
import { InjectRepository } from '@nestjs/typeorm';
import { EventsService } from 'src/events/events.service';
import { Repository } from 'typeorm';
import { DuesService } from 'src/dues/dues.service';
import { PaymentPlanResponseDTO } from './dto/payment-plan-response.dto';
import { BudgetsService } from 'src/budgets/budgets.service';

@Injectable()
export class PaymentPlanService {

	private readonly logger = new Logger(PaymentPlanService.name);

	constructor(
		@InjectRepository(PaymentPlan)
		private paymentPlanRepository: Repository<PaymentPlan>,
		@Inject(forwardRef(() => EventsService))
		private eventsService: EventsService,
		@Inject(forwardRef(() => ClientsService))
		private clientsService: ClientsService,
		@Inject(forwardRef(() => DuesService))
		private duesService: DuesService,
		@Inject(forwardRef(() => BudgetsService))
		private budgetService: BudgetsService
	) { }

	async create(createPaymentPlanDto: CreatePaymentPlanDto) {
		return 'This action adds a new paymentPlan';
	}

	async findAll() {
		let paymentPlans : PaymentPlan[] = await this.paymentPlanRepository.find();

		let paymentPlanResponseDTO : PaymentPlanResponseDTO[] = [];

		for (let paymentPlan of paymentPlans){
			paymentPlanResponseDTO.push(await this.getPaymentPlan(paymentPlan));
		}

		return await paymentPlanResponseDTO;
	}

	async findOne(id: number, compose: boolean = false) {
		return await this.paymentPlanRepository.findOneBy({ id: id }).then(async paymentPlan => {
			if (!!compose){
				return await this.getPaymentPlan(paymentPlan);
			} else {
				return await paymentPlan;
			}
		})
	}

	async update(id: number, updatePaymentPlanDto: UpdatePaymentPlanDto) {
		return `This action updates a #${id} paymentPlan`;
	}

	async remove(id: number) {
		let paymentPlan = await this.paymentPlanRepository.findOneBy({id: id});

		if (!paymentPlan) {
			this.logger.error("The payment plan with id " + id + " couldn't been found.");
			return new NotFoundException("The payment plan with id " + id + " couldn't been found.");
		}

		return await this.paymentPlanRepository.remove(paymentPlan);
	}

	async getPaymentPlan(paymentPlan : number|PaymentPlan){
		let paymentPlanResponseDto : PaymentPlanResponseDTO = undefined;
		if (typeof(paymentPlan) === 'number'){
			let paymentPlanToGet = await this.paymentPlanRepository.findOneBy({id: paymentPlan})
			paymentPlanResponseDto = { ...paymentPlanToGet }
		} else {
			paymentPlanResponseDto = { ...paymentPlan }
		}
		if (!!paymentPlanResponseDto?.clientId){
			paymentPlanResponseDto.client = await this.clientsService.findOne(paymentPlanResponseDto.clientId);
		}
		if (!!paymentPlanResponseDto?.budgetId){
			paymentPlanResponseDto.budget = await this.budgetService.findOne(paymentPlanResponseDto.budgetId);
		}

		return paymentPlanResponseDto;
	}
}
