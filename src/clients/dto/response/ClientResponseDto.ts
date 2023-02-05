import { User } from 'src/users/entities/user.entity';
import { Contact } from '../../../contacts/entities/contact.entity';
import { UserResponseDTO } from '../../../users/dto/response/UserResponseDTO';

export class ClientResponseDTO{

    id: number;

    name: string;

    surname: string;

    identificationNumber: string;

    guestsQuantity: number;

    address: string;

    contacts?: Contact[];

    user?: UserResponseDTO;

}