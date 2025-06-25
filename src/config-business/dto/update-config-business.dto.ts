import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigBusinessDto } from './create-config-business.dto';

export class UpdateConfigBusinessDto extends PartialType(CreateConfigBusinessDto) {}
