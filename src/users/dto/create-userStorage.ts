import { ValidateNested } from "class-validator";
import { CreateUserDto } from "./create-users.dto";
import { Type } from "class-transformer";
import { CreateStorageDto } from "src/storage/dto/create-storage.dto";

export class CreateUserStorageDto extends CreateUserDto {

    @ValidateNested()
    @Type(() => CreateStorageDto)
    storageData: CreateStorageDto;
}