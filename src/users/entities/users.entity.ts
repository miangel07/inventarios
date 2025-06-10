import { Role } from 'src/role/entities/role.entity';
import { Storage } from 'src/storage/entities/storage.entity';
import { ObjetGenericStatus, StatusGeneric } from 'src/utils/TypeGeneric';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { TypeDocument } from '../types/TypeUsers';
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
  password: string;

  @Column()
  phone: string;

  @Column({ unique: true, nullable: true })
  identificationNumber: number;

  @Column({ nullable: true })
  address: string;

  @Column(ObjetGenericStatus())
  Status: StatusGeneric

  @Column({
    type: "enum",
    enum: TypeDocument,
    nullable: true
  })
  typeDocument: TypeDocument


  @ManyToOne(() => Role, (role) => role.UsersRole)
  Rol: Role;

  @OneToMany(() => Storage, (storage) => storage.manager)
  managedStorages: Storage[];

  @Column({ unique: true })
  email: string;
  @Column()
  createDate: Date;
}
