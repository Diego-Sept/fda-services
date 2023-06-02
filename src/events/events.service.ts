import { BadRequestException, Inject, Injectable, Logger, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRequestDto } from './dto/event-request.dto';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientFractionService } from 'src/client-fraction/client-fraction.service';
import { ClientsService } from 'src/clients/clients.service';
import { EventTypesService } from 'src/event-types/event-types.service';
import { FractionsService } from 'src/fractions/fractions.service';
import { SaloonsService } from 'src/saloons/saloons.service';
import { Repository } from 'typeorm';
import { EventStatesService } from 'src/event-states/event-states.service';
import { EventResponseDto } from './dto/event-response-dto';

@Injectable()
export class EventsService {

	private readonly logger = new Logger(EventsService.name);

	constructor(
		@InjectRepository(Event)
		private eventsRepository: Repository<Event>,
		@Inject(forwardRef(() => ClientsService))
		private clientService: ClientsService,
		@Inject(forwardRef(() => FractionsService))
		private fractionService: FractionsService,
		@Inject(forwardRef(() => SaloonsService))
		private saloonsService: SaloonsService,
		@Inject(forwardRef(() => EventTypesService))
		private eventTypesService: EventTypesService,
		@Inject(forwardRef(() => EventStatesService))
		private eventStateService: EventStatesService,
	) { }

	async create(eventRequestDto: EventRequestDto, compose: boolean = true) {
		if (!!eventRequestDto.client) {
			let client = this.clientService.findOne(eventRequestDto.client.id);
			client.catch(e => {
				this.logger.warn("Client not found with id: " + eventRequestDto.client.id);
				throw new BadRequestException("No se encontró el cliente seleccionado.", e);
			})
		}
		if (!!eventRequestDto.fraction) {
			let fraction = this.fractionService.findOne(eventRequestDto.fraction.id);
			fraction.catch(e => {
				this.logger.warn("Fraction not found with id: " + eventRequestDto.fraction.id);
				throw new BadRequestException("No se encontró el grupo seleccionado.", e);
			})
		}
		if (!!eventRequestDto.saloon) {
			let saloon = this.saloonsService.findOne(eventRequestDto.saloon.id);
			saloon.catch(e => {
				this.logger.warn("Saloon not found with id: " + eventRequestDto.saloon.id);
				throw new BadRequestException("No se encontró el salón seleccionado.", e);
			})
		}
		if (!!eventRequestDto.eventType) {
			let eventType = this.eventTypesService.findOne(eventRequestDto.eventType.id);
			eventType.catch(e => {
				this.logger.warn("EventType not found with id: " + eventRequestDto.eventType.id);
				throw new BadRequestException("No se encontró el tipo de evento seleccionado.", e);
			})
		}
		if (!!eventRequestDto.state) {
			let eventState = this.eventStateService.findOne(eventRequestDto.state.id);
			eventState.catch(e => {
				this.logger.warn("EventState not found with id: " + eventRequestDto.state.id);
				throw new BadRequestException("No se encontró el estado seleccionado.", e);
			})
		}
		if (!eventRequestDto.title) {
			this.logger.warn("Title is requested");
			throw new BadRequestException("El título es requerido.");
		}
		if (!eventRequestDto.startDate && !eventRequestDto.endDate) {
			this.logger.warn("Date is requested");
			throw new BadRequestException("Se requiere una fecha del evento.");
		}
		let eventEntity = await this.eventsRepository.save(eventRequestDto);

		if (!!compose) {
			return await this.getEvent(eventEntity);
		} else {
			return eventEntity;
		}
	}

	async findAll() {
		const events: Event[] = await this.eventsRepository.find();

		const eventsResponse: EventResponseDto[] = [];

		for (const event of events) {
			const eventResponseDTO = await this.getEvent(event);
			eventsResponse.push(eventResponseDTO);
		}

		return eventsResponse;
	}

	async findOne(id: number, compose: boolean = true) {
		const eventEntity: Event = await this.eventsRepository.findOneBy({ id: id });

		if (!eventEntity) {
			throw new NotFoundException('No se encontró el evento solicitado');
		}

		if (!!compose) {
			return await this.getEvent(eventEntity);
		} else {
			return eventEntity;
		}
	}

	async update(id: number, eventRequestDto: EventRequestDto, compose: boolean = true) {
		let eventEntity = await this.findOne(id, false) as Event;

		if (!!eventRequestDto) {
			eventEntity.clientId = eventRequestDto.client?.id;
			eventEntity.saloonId = eventRequestDto.saloon.id;
			eventEntity.eventTypeId = eventRequestDto.eventType.id;
			eventEntity.fractionId = eventRequestDto.fraction?.id;
			eventEntity.stateId = eventRequestDto.state?.id;
			eventEntity.startDate = eventRequestDto.startDate;
			eventEntity.endDate = eventRequestDto.endDate;
			eventEntity.observations = eventRequestDto.observations;
			eventEntity.title = eventRequestDto.title;
			eventEntity = await this.eventsRepository.save(eventEntity);
		} else {
			throw new BadRequestException("Debe enviar los datos del evento para actualizar.")
		}

		if (!!compose) {
			return await this.getEvent(eventEntity);
		} else {
			return eventEntity;
		}
	}

	async remove(id: number): Promise<void> {
		const eventEntity = await this.findOne(id);

		if (!eventEntity) {
			throw new NotFoundException('No se encontró el evento solicitado');
		}

		await this.eventsRepository.delete(id);
	}

	async getEvent(event: Event) {
		let eventResponseDto: EventResponseDto = { ...event };

		if (!!event.clientId) {
			eventResponseDto.client = await this.clientService.findOne(event.clientId);
		}
		if (!!event.fractionId) {
			eventResponseDto.fraction = await this.fractionService.findOne(event.fractionId);
		}
		if (!!event.saloonId) {
			eventResponseDto.saloon = await this.saloonsService.findOne(event.saloonId);
		}
		if (!!event.eventTypeId) {
			eventResponseDto.eventType = await this.eventTypesService.findOne(event.eventTypeId);
		}
		if (!!event.stateId) {
			eventResponseDto.state = await this.eventStateService.findOne(event.stateId);
		}

		return eventResponseDto;
	}
}
