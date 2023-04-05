import { ClientResponseDTO } from "src/clients/dto/response/ClientResponseDto";

export interface FractionResponseDto {

    id: number;

    name: string;

    clients?: ClientResponseDTO[];
}