import { IsString, IsEnum, IsOptional } from 'class-validator';
import { StatusGeneric } from 'src/utils/TypeGeneric';
import { IsUniqueCategory } from '../validation/validate-category';

export class CreateCategoryDto {
  @IsString()
  @IsUniqueCategory('NameCategory')
  NameCategory: string;

  @IsEnum(StatusGeneric)
  @IsOptional()
  Status?: StatusGeneric;
}
