import { ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('Roles')
export class CreateRoleDto {

    @ApiProperty()
    name: string;

}
