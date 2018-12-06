import { Injectable } from "@nestjs/common";
import { OrderItem } from "./orderItem.entity";
import { OrderItemsPolicies } from "./orderItems.policies";
import { Product } from "../../products/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { OrderItemRepository } from "./orderItem.repository";
import { Transactional } from "typeorm-transactional-cls-hooked";

@Injectable()
export class OrderItemsService {

    constructor(
        private readonly orderItemsPolicies: OrderItemsPolicies,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private orderItemRepository: OrderItemRepository
    ) {
        this.orderItemRepository = this.orderItemRepository.manager.getCustomRepository(OrderItemRepository);
    }

    @Transactional()
    async save(item: OrderItem, orderId: number, product?: Product) {
        if (!product) {
            product = await this.productRepository.findOne(item.product_id);
        }

        item.order_id = orderId;

        this.orderItemsPolicies.checkRentability(item.unit_price, product.unit_price, product.name);
        this.orderItemsPolicies.checkMultiple(item.quantity, product.multiple, product.name);

        return this.orderItemRepository.save(item);
    }

    @Transactional()
    async saveMultiple(items: OrderItem[], orderId: number) {
        const savedItems = [];
        const products = await this.productRepository.find({
            id: In(items.map(item => item.product_id))
        });

        for (let item of items) {
            const product = products.find(product => product.id === item.product_id);
            const savedItem = await this.save(item, orderId, product);
            savedItems.push(savedItem);
        }

        return savedItems;
    }
}