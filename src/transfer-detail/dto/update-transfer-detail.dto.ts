import { PartialType } from '@nestjs/mapped-types';
import { CreateTransferDetailDto } from './create-transfer-detail.dto';

export class UpdateTransferDetailDto extends PartialType(CreateTransferDetailDto) {}
