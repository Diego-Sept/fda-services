import { ClientResponseDTO } from "src/clients/dto/response/ClientResponseDto";
import { EventResponseDto } from "src/events/dto/event-response-dto";

export interface PaymentPlanRequestDtO{

    id?: number;

    clientId?: number;

    client?: ClientResponseDTO;

    budgetId?: number;

    budget?: EventResponseDto;

    title: string;

}