import { Role } from "src/roles/entities/role.entity";

export class UserResponseDTO {

    id: number;
    username: string;
    password: string;
    clientId: number;
    role?: Role;

}