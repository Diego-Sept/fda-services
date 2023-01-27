import { ApiProperty } from "@nestjs/swagger";
import { Client } from "src/clients/entities/client.entity";

export class CreateContactDto {

    @ApiProperty()
    name?: string;

    @ApiProperty()
    phone?: string;

    @ApiProperty()
    email?: string;

    @ApiProperty()
    mainContact?: boolean;

    @ApiProperty()
    client?: Client;

}
