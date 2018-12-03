
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersPolicies } from './orders.policies';

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [OrdersService, OrdersPolicies],
    controllers: [OrdersController]
})
export class OrdersModule { }