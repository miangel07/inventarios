import { Validate } from "class-validator";
import { MeasureUnit } from "../entities/measure-unit.entity";
import { IsUniqueConstraint } from "src/validator/is-unique.validator.generic";

export function IsUniqueMeasureUnit(fillName: string) {
    return Validate(IsUniqueConstraint, [[MeasureUnit, fillName]]);
}