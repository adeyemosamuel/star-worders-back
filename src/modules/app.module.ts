
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        CustomersModule,
        ProductsModule
    ]
})
export class ApplicationModule { }