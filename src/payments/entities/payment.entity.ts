import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity'; 

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  supplier: string;

  @Column()
  productid: number;

  @ManyToOne(() => Product, (product) => product.payments) 
  @JoinColumn({ name: 'productid', referencedColumnName: 'id' })
  product: Product;

  @Column({ type: 'decimal', precision: 18, scale: 4 })
  amount: number;

  @Column({ type: 'datetime' })
  createDate: Date;

  @Column()
  createBy: string;
}
