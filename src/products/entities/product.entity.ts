import { Category } from "src/category/entities/category.entity";
import { MeasureUnit } from "src/measure-unit/entities/measure-unit.entity";
import { ObjetGenericStatus, StatusGeneric } from "src/utils/TypeGeneric";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameProduct: string

    @Column({ nullable: true })
    description?: string

    @Column()
    internalCode: string

    @Column({ nullable: true })
    brand?: string

    @Column()
    stok: number

    @Column()

    stokMax: number
    @Column()

    stokMin: number

    @Column(ObjetGenericStatus())
    Status: StatusGeneric

    @Column({ nullable: true })
    img?: string

    @Column({ nullable: true })
    observations?: string

    @Column({ nullable: true })
    location?: string
    
    @Column({ type: 'date', nullable: true })
    expirationDate?: Date;


    @ManyToOne(() => MeasureUnit, (unit) => unit.Product)
    measureUnit: MeasureUnit;


    @ManyToOne(() => Category, (Category) => Category.Product)
    category: Category;


}
