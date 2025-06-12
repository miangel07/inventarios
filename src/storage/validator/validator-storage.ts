import { Validate } from 'class-validator';
import { IsUniqueConstraint } from 'src/validator/is-unique.validator.generic';
import { Storage } from '../entities/storage.entity';

export function IsUniqueStorage(fillName: string) {
    return Validate(IsUniqueConstraint, [[Storage, fillName]]);
}