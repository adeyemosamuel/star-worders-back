import { Test } from '@nestjs/testing';
import { CustomersController } from '../customers.controller';
import { CustomersService } from '../customers.service';
import { Repository } from 'typeorm';
import { Customer } from '../customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Customers Controller Tests', () => {

    let customersController: CustomersController;
    let customersService: CustomersService;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [CustomersController],
            providers: [CustomersService, {
                provide: getRepositoryToken(Customer),
                useValue: {}
            }],
        }).compile();

        customersService = module.get<CustomersService>(CustomersService);
        customersController = module.get<CustomersController>(CustomersController);
    });

    describe('findAll', () => {
        it('should return an array of customers', async () => {
            const result = [new Customer(), new Customer()];
            jest.spyOn(customersService, 'findAll').mockImplementation(() => result);

            expect(await customersController.findAll()).toBe(result);
        });
    });
});