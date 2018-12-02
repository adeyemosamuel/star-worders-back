import { Controller, Get } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './customer.entity';

@Controller('customers')
export class CustomersController {
    constructor(private readonly customersService: CustomersService) { }

    @Get()
    findAll(): Promise<Customer[]> {
        return this.customersService.findAll();
    }
}