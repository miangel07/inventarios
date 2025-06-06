import { Product } from "src/products/entities/product.entity";
import { ObjetGenericStatus, StatusGeneric } from "src/utils/TypeGeneric";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class MeasureUnit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameUnit: string

    @Column()
    code: string

    @Column(ObjetGenericStatus())
    Status: StatusGeneric

    @OneToMany(() => Product, (Product) => Product.measureUnit)
    Product: Product[];

}
