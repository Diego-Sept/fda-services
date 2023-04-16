import { Client } from "src/clients/entities/client.entity";
import { EventType } from "src/event-types/entities/event-type.entity";
import { Fraction } from "src/fractions/entities/fraction.entity";
import { Saloon } from "src/saloons/entities/saloon.entity";

export class BudgetRequestDto {

    title: string;

    client: Client;

    fraction: Fraction;

    amount: number;

    startDate: Date;

    endDate: Date;

    eventType: EventType;

    saloon: Saloon;

    stateId: number;

    observations: string;

}