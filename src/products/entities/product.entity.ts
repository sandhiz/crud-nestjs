import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'datetime' })
  createDate: Date;

  @Column()
  createBy: string;
}
