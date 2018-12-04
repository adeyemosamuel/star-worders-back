import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository } from 'typeorm';
import { OrderItemsService } from './items/orderItems.service';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
        private readonly orderItemsService: OrderItemsService
    ) { }

    findAll(): Promise<Order[]> {
        return this.orderRepository.find({
            relations: ['items']
        });
    }

    async save(order: Order): Promise<Order> {
        const items = order.items;

        await this.orderItemsService.saveMultiple(items);

        return this.orderRepository.save(order);
    }
}