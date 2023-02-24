import { PartialType } from '@nestjs/swagger';
import { CreateClientFractionDto } from './create-client-fraction.dto';

export class UpdateClientFractionDto extends PartialType(CreateClientFractionDto) {}
