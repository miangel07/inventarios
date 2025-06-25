// src/seeds/user.seeder.ts
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-users.dto';
import { TypeDocument } from 'src/users/types/TypeUsers';


@Injectable()
export class UserSeeder {
    constructor(private readonly userService: UserService) { }

    async run() {
        const existing = await this.userService.findByField('email', 'admin@example.com');
        if (existing) {
            return;
        }

        const userData: CreateUserDto = {
            username: 'Miguel',
            password: 'admin123',
            email: 'miguel@example.com',
            lastname: 'Osoro',
            address: 'N/A',
            typeDocument: TypeDocument.CC,
            phone: '3136789456',
            identificationNumber: 1006459235,
            Rol: 3,
        };

        const result = await this.userService.create(userData);
        if(result) {
            console.log('Usuario administrador creado exitosamente:', result.data);
        }
    }
}
