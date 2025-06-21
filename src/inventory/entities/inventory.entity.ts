import { Product } from "src/products/entities/product.entity";
import { Storage } from "src/storage/entities/storage.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    // PRODUCTO
    @ManyToOne(() => Product, (product) => product.inventories)
    @JoinColumn({ name: 'productId' })
    product: Product;

    @Column()
    productId: number;

    // BODEGA
    @ManyToOne(() => Storage, (storage) => storage.Inventory)
    @JoinColumn({ name: 'storageId' })
    storage: Storage;

    @Column()
    storageId: number;
}
