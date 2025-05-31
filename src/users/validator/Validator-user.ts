import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments
  } from 'class-validator';
  import { Injectable } from '@nestjs/common';
  import { UserService } from '../users.service';
  /**
 * Validador personalizado asíncrono para verificar que el campo se unico en la base de datos.
 * 
 * Utiliza el servicio `UserService` para consultar si un valor específico ya existe en el campo indicado.
 * Implementa la interfaz `ValidatorConstraintInterface` de `class-validator` para integrarse con el sistema de validación
 * de NestJS.
 */

  
  @Injectable()
  @ValidatorConstraint({ async: true })
  export class IsUnique implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService) {}
  
    async validate(value: string, args: ValidationArguments) {
        const field = args.property; 
        const data= this.userService.existsByField
        ? !(await this.userService.existsByField(field, value))
        : true;
      
        return data
    }
  
    defaultMessage(args: ValidationArguments) {
      return `${args.value}"" ya está en uso`;
    }
  }
  