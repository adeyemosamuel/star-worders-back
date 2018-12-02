import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
}
