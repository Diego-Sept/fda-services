import { Event } from "src/events/entities/event.entity";

export class CreateBudgetDto {

    createdAt : Date;

    amount: number;

    event: Event;

    expirationDate : Date;

}
