import { Test } from '@nestjs/testing';
import { CustomersService } from '../customers.service';
import { Customer } from '../customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Customers Service Tests', () => {

    let customersService: CustomersService;
    const mockRepository = {
        find: jest.fn(() => [new Customer(), new Customer()])
    };

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [CustomersService, {
                provide: getRepositoryToken(Customer),
                useValue: mockRepository
            }],
        }).compile();

        customersService = module.get<CustomersService>(CustomersService);
    });

    describe('findAll', () => {
        it('should return an array of customers', async () => {
            expect(await customersService.findAll()).toEqual([new Customer(), new Customer()]);
        });
    });
});