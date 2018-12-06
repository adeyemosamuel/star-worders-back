import { Test } from '@nestjs/testing';
import { OrdersController } from '../orders.controller';
import { getRepositoryToken, getConnectionToken } from '@nestjs/typeorm';
import { Order } from '../order.entity';
import { OrdersService } from '../orders.service';
import { OrderItemsService } from '../items/orderItems.service';
import { Product } from '../../products/product.entity';
import { OrderItem } from '../items/orderItem.entity';
import { OrderItemsPolicies } from '../items/orderItems.policies';
import { orderDto } from '../order.dto';
import { OrderRepository } from '../order.repository';
import { OrderItemRepository } from '../items/orderItem.repository';

describe('Orders Controller Tests', async () => {

    let ordersController: OrdersController;
    let ordersService: OrdersService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [
                OrdersService,
                OrderItemsService,
                OrderItemsPolicies,
                OrderRepository,
                OrderItemRepository,
                {
                    provide: 'OrderRepository',
                    useValue: {
                        manager: {
                            getCustomRepository: jest.fn(() => ({
                                find: jest.fn(() => [new Order(), new Order()]),
                                save: jest.fn(() => new Order())
                            }))
                        }
                    }
                },
                {
                    provide: getRepositoryToken(Product),
                    useValue: {
                        find: jest.fn(() => [new Product()])
                    }
                },
                {
                    provide: 'OrderItemRepository',
                    useValue: {
                        manager: {
                            getCustomRepository: jest.fn(() => ({
                                save: jest.fn(() => new OrderItem())
                            }))
                        }
                    }
                }
            ],
        }).compile();

        ordersController = module.get<OrdersController>(OrdersController);
        ordersService = module.get<OrdersService>(OrdersService);
    });

    describe('findAll', () => {
        jest.spyOn(OrdersService.prototype, 'findAll').mockImplementation(() => [new Order(), new Order()]);
        it('should return an array of orders', async () => {
            expect(await ordersController.findAll()).toEqual([new Order(), new Order()]);
        });
    });

    describe('create', () => {
        it('should save a new order', async () => {
            jest.spyOn(ordersService, 'save').mockImplementation(() => new Order());
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
            jest.spyOn(ordersService, 'save').mockImplementation(() => new Order());
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