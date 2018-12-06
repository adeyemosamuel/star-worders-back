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
            relations: ['items', 'customer']
        });
    }

    findOne(id: number): Promise<Order> {
        return this.orderRepository.findOne(id, {
            relations: ['items', 'items.product', 'customer']
        });
    }

    async save(order: Order): Promise<Order> {
        const items = order.items;

        const savedOrder = await this.orderRepository.save(order);
        const savedItems = await this.orderItemsService.saveMultiple(items, savedOrder.id || order.id);

        savedOrder.items = savedItems;

        return savedOrder;
    }

    async remove(id: number): Promise<Order> {
        const order = await this.orderRepository.findOne(id);
        return this.orderRepository.remove(order);
    }
}