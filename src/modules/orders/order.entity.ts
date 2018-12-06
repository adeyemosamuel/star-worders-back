import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { OrderItem } from './items/orderItem.entity';
import { Customer } from '../customers/customer.entity';
import { Type } from 'class-transformer';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('int')
    customer_id: number;

    @Type(() => OrderItem)
    @OneToMany(() => OrderItem, item => item.order, { cascade: ["remove"] })
    items: OrderItem[];

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;
}
