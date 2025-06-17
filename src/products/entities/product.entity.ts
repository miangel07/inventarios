import { Category } from "src/category/entities/category.entity";
import { MeasureUnit } from "src/measure-unit/entities/measure-unit.entity";
import { ObjetGenericStatus, StatusGeneric } from "src/utils/TypeGeneric";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    stock: number

    @Column({ nullable: true })
    stockMax: number

    @Column({ nullable: true })
    stockMin: number

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


    @Column()
    measureUnitId: number;

    @ManyToOne(() => MeasureUnit, (unit) => unit.Product)
    @JoinColumn({ name: 'measureUnitId' })
    measureUnit: MeasureUnit;

    @Column()
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.Product)
    @JoinColumn({ name: 'categoryId' })
    category: Category;


}
