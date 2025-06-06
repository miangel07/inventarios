import { Product } from "src/products/entities/product.entity";
import { ObjetGenericStatus, StatusGeneric } from "src/utils/TypeGeneric";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    NameCategory: string

    @Column(ObjetGenericStatus())
    Status: StatusGeneric

    @OneToMany(() => Product, (Product) => Product.measureUnit)
    Product: Product[];
}
