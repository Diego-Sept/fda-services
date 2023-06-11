import { BudgetResponseDto } from "src/budgets/dto/budget-response.dto";
import { ClientResponseDTO } from "src/clients/dto/response/ClientResponseDto";
import { EventResponseDto } from "src/events/dto/event-response-dto";

export interface PaymentPlanResponseDTO {

    id?: number;

    client?: ClientResponseDTO;
    
    clientId?: number;

    budget?: BudgetResponseDto;

    budgetId?: number;

    title?: string;

}