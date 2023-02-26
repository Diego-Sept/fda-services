import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { CreateContactDto } from '../../contacts/dto/create-contact.dto';
import { CreateClientDto } from './create-client.dto';

export class ClientDto {

    @ApiProperty()
    clientData: CreateClientDto;
    
    @ApiProperty()
    contacts: CreateContactDto[];
    
    @ApiProperty()
    roleId?: number;

}