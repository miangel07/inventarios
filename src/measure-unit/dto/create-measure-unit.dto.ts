import { IsString, IsEnum, IsOptional } from 'class-validator';
import { StatusGeneric } from 'src/utils/TypeGeneric';
import { IsUniqueMeasureUnit } from '../validation/validation-measure-unit';

export class CreateMeasureUnitDto {
  @IsString()
  @IsUniqueMeasureUnit('nameUnit')
  nameUnit: string;

  @IsString()
  @IsUniqueMeasureUnit('code')
  code: string;

}
