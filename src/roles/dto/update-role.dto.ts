import { PartialType } from '@nestjs/mapped-types';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './create-role.dto';

@ApiTags('Roles')
export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
