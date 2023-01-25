import { ApiProperty } from "@nestjs/swagger";

export class CreateClientDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    surname: string;

    @ApiProperty()
    identificationNumber: string;

    @ApiProperty()
    guestsQuantity: number;

}
