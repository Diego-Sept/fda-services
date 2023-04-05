import { Client } from "src/clients/entities/client.entity";

export class FractionRequestDto {

    name: string;

    clients: Client[];

}