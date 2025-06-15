import { Validate } from 'class-validator';
import { IsUniqueConstraint } from 'src/validator/is-unique.validator.generic';
import { Product } from '../entities/product.entity';

export function IsUniqueProduct(fillName: string) {
    return Validate(IsUniqueConstraint, [[Product, fillName]]);
}