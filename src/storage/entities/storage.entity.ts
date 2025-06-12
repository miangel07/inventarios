import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { StorageType } from '../utils/TypeEnum-Storage';
import { ObjetGenericStatus, StatusGeneric } from 'src/utils/TypeGeneric';
import { Users } from 'src/users/entities/users.entity';
@Entity()
export class Storage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameStorage: string
    @Column({
        unique: true
    })
    address: string

    @Column({
        type: "enum",
        enum: StorageType,
    })
    TypeStorage: StorageType

    @Column(ObjetGenericStatus())
    Status: StatusGeneric

    @ManyToOne(() => Users, (user) => user.managedStorages)
    manager: Users;



}
