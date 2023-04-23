import { PartialType } from '@nestjs/swagger';
import { CreateDueDto } from './create-due.dto';

export class UpdateDueDto extends PartialType(CreateDueDto) {}
