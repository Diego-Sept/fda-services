import { EventResponseDto } from "src/events/dto/event-response-dto";

export class BudgetResponseDto {

    id: number;

    createdAt: Date;

    amount : number;

    eventId: number;

    expirationDate: Date;

    event?: EventResponseDto;

}