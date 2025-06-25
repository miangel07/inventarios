// src/role/dto/create-role.dto.ts

import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StatusGeneric } from 'src/utils/TypeGeneric';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  nameRol: string;

  @IsEnum(StatusGeneric)
  Status: StatusGeneric = StatusGeneric.active;
}
