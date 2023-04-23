import { Client } from "src/clients/entities/client.entity";
import { EventState } from "src/event-states/entities/event-state.entity";
import { EventType } from "src/event-types/entities/event-type.entity";
import { Fraction } from "src/fractions/entities/fraction.entity";
import { Saloon } from "src/saloons/entities/saloon.entity";


export interface EventRequestDto {

    title: string;

    client: Client;

    fraction: Fraction;

    saloon: Saloon;

    eventType: EventType;

    state: EventState;

    startDate: Date;

    endDate: Date;

    observations: string;

}