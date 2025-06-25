import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { ConfigBusiness } from 'src/config-business/entities/config-business.entity';
import { BusinessStatus, typeBusiness } from '../types/TypeBusiness';
import { Users } from 'src/users/entities/users.entity';



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
    @Column({ type: 'enum', default: typeBusiness.client, enum: typeBusiness })
    typeBusiness: typeBusiness;

    @Column({ type: 'date' })
    planRenewalDate: Date;

    @Column({
        type: 'enum',
        enum: BusinessStatus,
        default: BusinessStatus.ACTIVE,
    })
    status: BusinessStatus;
    @OneToMany(() => Users, (user) => user.Business)
    @JoinColumn({ name: 'userId' })
    user: Users[];

    @OneToMany(() => ConfigBusiness, (ConfigBusiness) => ConfigBusiness.Business)
    config: ConfigBusiness[];


}
