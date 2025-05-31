import { Storage } from 'src/storage/entities/storage.entity';
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
@Entity()
@Unique(['username'])
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()

  username: string;

  @Column()
  lastname: string;

  @Column()
  phone: string;
  @Column({ unique: true })

  identificationNumber: string;
  @Column()
  addres: number;

  @OneToMany(() => Storage, (storage) => storage.manager)
  managedStorages: Storage[];

  @Column({ unique: true })
  email: string;
  @Column()
  createDate: Date;
}
