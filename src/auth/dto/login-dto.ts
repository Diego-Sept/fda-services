import { ApiProperty } from "@nestjs/swagger";

export class LoginDTO {

    @ApiProperty()
    identificationNumber: string;

    @ApiProperty()
    password: string;
}