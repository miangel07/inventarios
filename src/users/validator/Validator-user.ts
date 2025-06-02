import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserService } from '../users.service';
import { Users } from '../entities/users.entity';
import { UpdateUserDto } from '../dto/update-users.dto';

/**
 * Validador personalizado asíncrono para verificar que el campo se unico en la base de datos. 
 *
 * Utiliza el servicio `UserService` para consultar si un valor específico ya existe en el campo indicado. * Implementa la interfaz `ValidatorConstraintInterface`
 *  de `class-validator` para integrarse con el sistema de validación * de NestJS.
  **/
@Injectable()
@ValidatorConstraint({ async: true })
export class IsUnique implements ValidatorConstraintInterface {
  constructor(private readonly userService: UserService) { }

  async validate(value: string, args: ValidationArguments) {
    const field = args.property;
    const object = args.object as UpdateUserDto;

    const currentId = object.id;

    const existingUser = await this.userService.findByField(field, value);

    if (!existingUser) {
      return true;
    }

    if (currentId) {
      return existingUser.id === currentId;
    }

    return false;
  }


  defaultMessage(args: ValidationArguments) {
    return `"${args.value}" ya está en uso`;
  }
}
