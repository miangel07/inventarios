import { Validate } from 'class-validator';
import { IsUniqueConstraint } from 'src/validator/is-unique.validator.generic';
import { Category } from '../entities/category.entity';


export function IsUniqueCategory(fillName: string) {
    return Validate(IsUniqueConstraint, [[Category, fillName]]);
}