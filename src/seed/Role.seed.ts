import { Injectable } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { CreateRoleDto } from 'src/role/dto/create-role.dto';
import { StatusGeneric } from 'src/utils/TypeGeneric';

@Injectable()
export class RoleSeeder {
    constructor(private readonly roleService: RoleService) { }

    async run() {
        const defaultRoles = ['super_admin', 'admin', 'storage_admin'];

        for (const name of defaultRoles) {
            const exists = await this.roleService.findByName(name);
            if (!exists) {
                const roleDto: CreateRoleDto = {
                    nameRol: name,
                    Status: StatusGeneric.active,
                };

                await this.roleService.create(roleDto);
                console.log(`Rol '${name}' creado.`);
            } else {
                console.log(`Rol '${name}' ya existe.`);
            }
        }
    }
}
