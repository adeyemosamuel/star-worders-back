import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { OrderItem } from './items/orderItem.entity';
import { Customer } from '../customers/customer.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => OrderItem, item => item.order)
    items: OrderItem[];

    @ManyToOne(() => Customer)
    customer: Customer;
}
