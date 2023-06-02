import { ClientResponseDTO } from "src/clients/dto/response/ClientResponseDto";
import { EventState } from "src/event-states/entities/event-state.entity";
import { EventType } from "src/event-types/entities/event-type.entity";
import { FractionResponseDto } from "src/fractions/dto/fraction-response.dto";
import { Saloon } from "src/saloons/entities/saloon.entity";

export class EventResponseDto {

    id: number;
    title: string;
    saloonId: number;
    saloon: Saloon;
    eventTypeId: number;
    eventType: EventType;
    clientId: number;
    client: ClientResponseDTO;
    fractionId: number;
    fraction: FractionResponseDto;
    startDate: Date;
    endDate: Date;
    guestsQuantity: number;
    observations: string;
    stateId: number;
    state: EventState;

}