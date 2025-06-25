import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ConfigBusiness } from 'src/config-business/entities/config-business.entity';

export enum BusinessStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    SUSPENDED = 'suspended',
}

@Entity()
export class Business {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    address: string;

    @Column({ type: 'date' })
    createdAt: Date;

    @Column({ type: 'date' })
    planRenewalDate: Date;

    @Column({
        type: 'enum',
        enum: BusinessStatus,
        default: BusinessStatus.ACTIVE,
    })
    status: BusinessStatus;

    @Column({ nullable: true })
    notes: string;

    @ManyToOne(() => ConfigBusiness, (config) => config.businesses)
    config: ConfigBusiness;
}
