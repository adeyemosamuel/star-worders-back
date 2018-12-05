import { Test } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';
import { Customer } from '../customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Customers Controller Tests', () => {

    let customersController: CustomersController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CustomersController],
            providers: [CustomersService, {
                provide: getRepositoryToken(Customer),
                useValue: {
                    find: jest.fn(() => [new Customer(), new Customer()])
                }
            }],
        }).compile();

        customersController = module.get<CustomersController>(CustomersController);
    });

    describe('findAll', () => {
        it('should return an array of customers', async () => {

            expect(await customersController.findAll()).toEqual([new Customer(), new Customer()]);
        });
    });
});