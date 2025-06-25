import { Business } from 'src/business/entities/business.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class ConfigBusiness {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: false,
    nullable: true,
  })
  infinty: boolean;


  @Column({
    default: 5
  })
  cuantityUsers: number;

  @Column({
    default: 5
  })
  maxStorage: number;

  @ManyToOne(() => Business, (Business) => Business.config)
  Business: Business;
}
