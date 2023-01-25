import { User } from 'src/users/entities/user.entity';
import { Contact } from '../../../contacts/entities/contact.entity';

export class ClientResponseDTO{

    id: number;

    name: string;

    surname: string;

    identificationNumber: string;

    guestsQuantity: number;

    contacts?: Contact[];

    user?: User;

}