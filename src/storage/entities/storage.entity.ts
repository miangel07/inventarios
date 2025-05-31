import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { StorageType } from '../utils/TypeEnum-Storage';
import { StatusGeneric } from 'src/utils/TypeGeneric';
import { Users } from 'src/users/entities/users.entity';
@Entity()
@Unique(['address'])
export class Storage {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameStorage: string


    @Column()
    address: string

    @Column({
        type: "enum",
        enum: StorageType,
    })
    TypeStorage: StorageType
    @Column(
        {
            type: "enum",
            enum: StatusGeneric,
            default: StatusGeneric.active
        }
    )
    Status: StatusGeneric
    
    @ManyToOne(() => Users, (user) => user.managedStorages)
    manager: Users;

   

}
