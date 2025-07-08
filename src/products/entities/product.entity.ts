import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { MeasureUnit } from 'src/measure-unit/entities/measure-unit.entity';
import { Category } from 'src/category/entities/category.entity';
import { Inventory } from 'src/inventory/entities/inventory.entity';
import { Business } from 'src/business/entities/business.entity';
import { ObjetGenericStatus, StatusGeneric } from 'src/utils/TypeGeneric';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameProduct: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  internalCode: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ nullable: true })
  stockMax: number;

  @Column({ nullable: true })
  stockMin: number;

  @Column(ObjetGenericStatus())
  Status: StatusGeneric;

  @Column({ nullable: true })
  img?: string;

  @Column({ nullable: true })
  observations?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ type: 'date', nullable: true })
  expirationDate?: Date;

  // Foreign Keys (solo IDs)
  @Column()
  measureUnitId: number;

  @Column()
  categoryId: number;

  @Column()
  businessId: number;

  // Relaciones
  @ManyToOne(() => MeasureUnit, (unit) => unit.Product)
  @JoinColumn({ name: 'measureUnitId' })
  measureUnit: MeasureUnit;

  @ManyToOne(() => Category, (category) => category.Product)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => Business, (business) => business.Producto)
  @JoinColumn({ name: 'businessId' })
  business: Business;

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];
}
