import { Injectable, Inject } from '@nestjs/common';
import { Order } from './order.entity';
import { OrderItemsService } from './items/orderItems.service';
import { OrderRepository } from './order.repository';
import { Transactional } from 'typeorm-transactional-cls-hooked';

@Injectable()
export class OrdersService {

    constructor(
        private orderRepository: OrderRepository,
        private readonly orderItemsService: OrderItemsService
    ) {
        this.orderRepository = this.orderRepository.manager.getCustomRepository(OrderRepository);
    }

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

    @Transactional()
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