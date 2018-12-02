
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';

@Module({
    imports: [TypeOrmModule.forRoot(), CustomersModule]
})
export class ApplicationModule { }