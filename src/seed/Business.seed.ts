// src/seeds/business.seeder.ts
import { Injectable } from '@nestjs/common';
import { BusinessService } from 'src/business/business.service';
import { CreateBusinessDto } from 'src/business/dto/create-business.dto';
import { typeBusiness } from 'src/business/types/TypeBusiness';

@Injectable()
export class BusinessSeeder {
    constructor(private readonly businessService: BusinessService) { }

    async run() {
        const businessName = 'inventary';

        // Verificamos si ya existe un negocio con ese nombre
        const exists = await this.businessService.findByName(businessName);
        if (exists) {
            console.log(`Negocio "${businessName}" ya existe. Seed ignorado.`);
            return;
        }

        const businessData: CreateBusinessDto = {
            name: businessName,
            address: 'Carrera 7 # 8-99',
            createdAt: new Date().toISOString().split('T')[0],
            typeBusiness: typeBusiness.admin,
            planRenewalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
            config: {
                infinty: true,
                cuantityUsers: 0,
                maxStorage: 0,
            },
        };

        const result = await this.businessService.create(businessData);

        if (result) {
            console.log('Negocio creado exitosamente:', result.data);
        }
    }
}
