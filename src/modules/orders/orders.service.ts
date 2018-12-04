import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { Repository, In } from 'typeorm';
import { Product } from '../products/product.entity';
import { Policie } from '../../common/interfaces/policies.interface';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @Inject('OrderItemsPolicies')
        private readonly orderItemsPolicies: Policie
    ) { }

    findAll(): Promise<Order[]> {
        return this.orderRepository.find({
            relations: ['items']
        });
    }

    async save(order: Order): Promise<Order> {
        const items = order.items;
        const products = await this.productRepository.find({
            id: In(items.map(item => item.product_id))
        });

        for (let item of items) {
            const product = products.find(product => product.id === item.product_id);
            this.orderItemsPolicies.execute(item, product);
        }

        return this.orderRepository.save(order);
    }
}