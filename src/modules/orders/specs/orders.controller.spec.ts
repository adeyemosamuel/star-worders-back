import { Test } from '@nestjs/testing';
import { OrdersController } from '../orders.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Order } from '../order.entity';
import { OrdersService } from '../orders.service';
import { OrderItemsService } from '../items/orderItems.service';
import { Product } from '../../products/product.entity';
import { OrderItem } from '../items/orderItem.entity';
import { OrderItemsPolicies } from '../items/orderItems.policies';
import { orderDto } from '../order.dto';

describe('Orders Controller Tests', () => {

    let ordersController: OrdersController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [
                OrdersService,
                OrderItemsService,
                OrderItemsPolicies,
                {
                    provide: getRepositoryToken(Order),
                    useValue: {
                        find: jest.fn(() => [new Order(), new Order()]),
                        save: jest.fn(() => new Order())
                    }
                },
                {
                    provide: getRepositoryToken(Product),
                    useValue: {
                        find: jest.fn(() => [new Product()])
                    }
                },
                {
                    provide: getRepositoryToken(OrderItem),
                    useValue: {
                        save: jest.fn(() => new OrderItem())
                    }
                }
            ],
        }).compile();

        ordersController = module.get<OrdersController>(OrdersController);
    });

    describe('findAll', () => {
        it('should return an array of orders', async () => {
            expect(await ordersController.findAll()).toEqual([new Order(), new Order()]);
        });
    });

    describe('create', () => {
        it('should save a new order', async () => {
            let order: orderDto = {
                customer_id: 1,
                items: [
                    new OrderItem(),
                    new OrderItem()
                ]
            };
            expect(await ordersController.create(order)).toEqual(new Order());
        });
    });

    describe('update', () => {
        it('should update an order', async () => {
            let order: orderDto = {
                customer_id: 1,
                items: [
                    new OrderItem(),
                    new OrderItem()
                ]
            };
            expect(await ordersController.update('1', order)).toEqual(new Order());
        });
    });
});