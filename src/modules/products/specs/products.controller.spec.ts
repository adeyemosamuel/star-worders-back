import { Test } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../product.entity';
import { ProductsService } from '../products.service';

describe('Products Controller Tests', () => {

    let productsController: ProductsController;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [ProductsService, {
                provide: getRepositoryToken(Product),
                useValue: {
                    find: jest.fn(() => [new Product(), new Product()])
                }
            }],
        }).compile();

        productsController = module.get<ProductsController>(ProductsController);
    });

    describe('findAll', () => {
        it('should return an array of products', async () => {
            expect(await productsController.findAll()).toEqual([new Product(), new Product()]);
        });
    });
});