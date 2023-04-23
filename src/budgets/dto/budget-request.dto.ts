import { Client } from "src/clients/entities/client.entity";
import { EventType } from "src/event-types/entities/event-type.entity";
import { EventRequestDto } from "src/events/dto/event-request.dto";
import { Fraction } from "src/fractions/entities/fraction.entity";
import { Saloon } from "src/saloons/entities/saloon.entity";

export class BudgetRequestDto {

    amount: number;

    event: EventRequestDto;

}