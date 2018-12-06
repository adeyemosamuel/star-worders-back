import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
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

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Order> {
        return this.ordersService.findOne(parseInt(id));
    }

    @Post()
    create(@Body() payload: orderDto): Promise<Order> {

        const order = plainToClass(Order, payload);
        order.id = null;

        return this.ordersService.save(order);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() payload: orderDto): Promise<Order> {

        const order = plainToClass(Order, payload);
        order.id = parseInt(id);

        return this.ordersService.save(order);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.ordersService.remove(parseInt(id));
    }
}