import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrdersPolicies } from './orders.policies';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    findAll() {
        return this.orderRepository.find({
            relations: ['items']
        });
    }

    save(order: Order) {
        return this.orderRepository.save(order);
    }
}