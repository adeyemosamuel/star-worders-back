import { Controller, Get, Post, Body, Put, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { orderDto } from './order.dto';
import { plainToClass } from "class-transformer";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Get()
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Post()
    create(@Body() payload: orderDto): Promise<Order> {

        const order = plainToClass(Order, payload);
        order.id = null;

        return this.ordersService.save(order);
    }

    @Put(':id')
    update(@Param('id') id, @Body() payload: orderDto): Promise<Order> {

        const order = plainToClass(Order, payload);
        order.id = parseInt(id);

        return this.ordersService.save(order);
    }
}