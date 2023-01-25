import { ApiProperty } from "@nestjs/swagger";

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
    clientId?: number;

}
