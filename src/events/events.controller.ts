import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, BadRequestException } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventRequestDto } from './dto/event-request.dto';

@Controller('events')
export class EventController {
	constructor(private readonly eventService: EventsService) { }

	@Post()
	async create(@Body() eventRequestDto: EventRequestDto) {
		try {
			const createdEvent = await this.eventService.create(eventRequestDto);
			return createdEvent;
		} catch (error) {
			throw new BadRequestException('No se pudo crear el evento');
		}
	}

	@Get()
	async findAll() {
		try {
			const events = await this.eventService.findAll();
			return events;
		} catch (error) {
			throw new NotFoundException('No se encontraron eventos');
		}
	}

	@Get(':id')
	async findOne(@Param('id') id: number) {
		try {
			const event = await this.eventService.findOne(id);
			return event;
		} catch (error) {
			throw new NotFoundException('No se encontró el evento solicitado');
		}
	}

	@Patch(':id')
	async update(@Param('id') id: number, @Body() eventRequestDto: EventRequestDto) {
		try {
			const updatedEvent = await this.eventService.update(id, eventRequestDto);
			return updatedEvent;
		} catch (error) {
			throw new BadRequestException('No se pudo actualizar el evento');
		}
	}

	@Delete(':id')
	async remove(@Param('id') id: number) {
		try {
			await this.eventService.remove(id);
		} catch (error) {
			throw new NotFoundException('No se encontró el evento solicitado');
		}
	}
}