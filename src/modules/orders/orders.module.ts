
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Product } from '../products/product.entity';
import { OrderItemsPolicies } from './items/orderItems.policies';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Product])],
    providers: [OrdersService, OrderItemsPolicies],
    controllers: [OrdersController]
})
export class OrdersModule { }