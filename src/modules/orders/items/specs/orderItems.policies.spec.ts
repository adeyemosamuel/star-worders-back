import { OrderItemsPolicies } from '../orderItems.policies';
import { Product } from '../../../products/product.entity';
import { UnprocessableEntityException } from '@nestjs/common';

describe('orderItems policies tests', () => {

    let orderItemsPolicies: OrderItemsPolicies;

    beforeEach(() => {
        orderItemsPolicies = new OrderItemsPolicies();
    });

    it('should throw an error if the rentability is lower than 10% of the original price', () => {
        let price = 89.99;
        const originalPrice = 100;
        const product = new Product();
        product.name = 'Product Test';

        expect(() => orderItemsPolicies.checkRentability(price, originalPrice, product.name)).toThrow(UnprocessableEntityException);

        price = 90;

        expect(() => orderItemsPolicies.checkRentability(price, originalPrice, product.name)).not.toThrow(UnprocessableEntityException);
    });

    it('should throw an error if the item quantity does not respect the multiple', () => {
        const quantity = 10;
        let multiple = 3;
        const product = new Product();
        product.name = 'Product Test I';

        expect(() => orderItemsPolicies.checkMultiple(quantity, multiple, product.name)).toThrow(UnprocessableEntityException);

        multiple = 2;

        expect(() => orderItemsPolicies.checkMultiple(quantity, multiple, product.name)).not.toThrow(UnprocessableEntityException);
    });
});