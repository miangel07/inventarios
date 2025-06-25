import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Business } from 'src/business/entities/business.entity';

@Entity()
export class ConfigBusiness {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default:5
  })
  cuantityUsers: number;

  @Column({
    default:5
  })
  maxStorage: number;

  @OneToMany(() => Business, (business) => business.config)
  businesses: Business[];
}
