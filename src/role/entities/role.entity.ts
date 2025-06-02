import { Users } from "src/users/entities/users.entity";
import { StatusGeneric } from "src/utils/TypeGeneric";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToMany(() => Users, (user) => user.Rol)
    UsersRole: Users[];

    @Column()
    nameRol: string
    @Column()
    @Column(
        {
            type: "enum",
            enum: StatusGeneric,
            default: StatusGeneric.active
        }
    )
    Status: StatusGeneric
}
