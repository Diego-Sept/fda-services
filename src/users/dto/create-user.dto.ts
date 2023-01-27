import { Client } from "src/clients/entities/client.entity";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {

    username: string;

    password: string;

    roleId?: number;

    role?: Role;

    client: Client;

}
