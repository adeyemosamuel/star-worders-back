
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Product } from '../products/product.entity';
import { OrderItemsPolicies } from './items/orderItems.policies';
import { OrderItemsService } from './items/orderItems.service';
import { OrderItem } from './items/orderItem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product, OrderItem])],
    providers: [OrdersService, OrderItemsService, OrderItemsPolicies],
    controllers: [OrdersController]
})
export class OrdersModule { }