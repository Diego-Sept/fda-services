import { ApiProperty } from "@nestjs/swagger";

export class CreateEventTypeDto {

    @ApiProperty()
    name: string;

}
