import { PartialType } from '@nestjs/swagger';
import { CreateSaloonDto } from './create-saloon.dto';

export class UpdateSaloonDto extends PartialType(CreateSaloonDto) {}
