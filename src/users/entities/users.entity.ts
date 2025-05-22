import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';
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
  @Column({unique: true})

  identificationNumber:string;
  @Column()
  addres: number;

  @Column({unique: true})
  email: string;
  @Column()
  createDate: Date;
}
