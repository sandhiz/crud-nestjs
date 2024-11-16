import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Payment } from '../../payments/entities/payment.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ default: true })
  isActive: boolean;

 
  @Column()
  createBy: string;

  @Column({ type: 'datetime' })
  createDate: Date;
  
  @OneToMany(() => Payment, (payment) => payment.product)
  payments: Payment[];
}
