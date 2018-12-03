import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { OrderItem } from './items/orderItem.entity';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Post()
    create(@Body() payload) {

        const order = new Order();
        order.id = null;
        order.customer_id = payload.customer_id;
        order.items = payload.items.map(item => {
            const orderItem = new OrderItem();
            orderItem.product_id = item.product_id;
            orderItem.quantity = item.quantity;
            orderItem.unit_price = item.unit_price;
            orderItem.id = null;

            return orderItem;
        });

        return this.ordersService.save(order);
    }

    @Put(':id')
    update(@Param('id') id, @Body() payload) {
        const order = new Order();
        order.id = parseInt(id);
        order.customer_id = payload.customer_id;
        order.items = payload.items.map(item => {
            const orderItem = new OrderItem();
            orderItem.product_id = item.product_id;
            orderItem.quantity = item.quantity;
            orderItem.unit_price = item.unit_price;
            orderItem.id = item.id;

            return orderItem;
        });

        return this.ordersService.save(order);
    }
}