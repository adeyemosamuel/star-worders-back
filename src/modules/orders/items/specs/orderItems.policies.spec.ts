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

    it('should throw an error if quantity is not an integer or lower than zero', () => {
        let quantity = -10;
        const product = new Product();
        product.name = 'Product Test II';

        expect(() => orderItemsPolicies.checkQuantity(quantity, product.name)).toThrow(UnprocessableEntityException);

        quantity = '1' as any;

        expect(() => orderItemsPolicies.checkQuantity(quantity, product.name)).toThrow(UnprocessableEntityException);

        quantity = 2;

        expect(() => orderItemsPolicies.checkQuantity(quantity, product.name)).not.toThrow(UnprocessableEntityException);
    });

    it('should throw an error if unit price have more than two decimal places or is lower than zero', () => {
        let unitPrice = -10;
        const product = new Product();
        product.name = 'Product Test III';

        expect(() => orderItemsPolicies.checkUnitPrice(unitPrice, product.name)).toThrow(UnprocessableEntityException);

        unitPrice = 520.0236;

        expect(() => orderItemsPolicies.checkUnitPrice(unitPrice, product.name)).toThrow(UnprocessableEntityException);

        unitPrice = 2;

        expect(() => orderItemsPolicies.checkUnitPrice(unitPrice, product.name)).not.toThrow(UnprocessableEntityException);
    });
});