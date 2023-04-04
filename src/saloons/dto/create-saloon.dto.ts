import { ApiProperty } from "@nestjs/swagger";

export class CreateSaloonDto {
    @ApiProperty()
    name: string;
}
