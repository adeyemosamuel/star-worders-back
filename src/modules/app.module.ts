
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        CustomersModule,
        ProductsModule,
        OrdersModule
    ]
})
export class ApplicationModule { }