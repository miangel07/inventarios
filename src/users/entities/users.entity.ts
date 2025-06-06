import { Role } from 'src/role/entities/role.entity';
import { Storage } from 'src/storage/entities/storage.entity';
import { ObjetGenericStatus, StatusGeneric } from 'src/utils/TypeGeneric';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true
  })
  username: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;
  @Column({ unique: true })

  identificationNumber: number;
  @Column()
  addres: string;

  @Column(ObjetGenericStatus())
  Status: StatusGeneric
  @ManyToOne(() => Role, (role) => role.UsersRole)
  Rol: Role;

  @OneToMany(() => Storage, (storage) => storage.manager)
  managedStorages: Storage[];

  @Column({ unique: true })
  email: string;
  @Column()
  createDate: Date;
}
