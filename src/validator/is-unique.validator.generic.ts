// is-unique.constraint.ts
import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { DataSource, ObjectLiteral } from 'typeorm';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
    constructor(private readonly dataSource: DataSource) { }

    async validate(value: string, args: ValidationArguments): Promise<boolean> {
        const [[EntityClass, field]] = args.constraints as [[new () => ObjectLiteral, string]];
        const repository = this.dataSource.getRepository(EntityClass);
      console.log("argumentos",args)
        const currentObject = args.object as { id?: number };
      
        // Buscar un registro con ese valor en ese campo
        const existing = await repository.findOne({ where: { [field]: value } });
      
        // Si no existe ningún registro con ese valor, está OK
        if (!existing) return true;
      
        // Si estamos editando y el ID coincide, es el mismo registro → OK
        if (currentObject.id !== undefined && existing.id === currentObject.id) {
          return true;
        }
      
        // Si el valor duplicado está en otro registro → Error
        return false;
      }
      
    

    defaultMessage(args: ValidationArguments): string {
        const [[, field]] = args.constraints as [[Function, string]];
        return `"El valor ${args.value}" ya está en uso en el campo `;
    }
}
