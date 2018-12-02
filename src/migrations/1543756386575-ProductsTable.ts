import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const defaultProducts = [
    {
        Name: "Millenium Falcon",
        UnitPrice: 550000,
        Multiple: null
    },
    {
        Name: "X-Wing",
        UnitPrice: 60000,
        Multiple: 2
    },
    {
        Name: "Super Star Destroyer",
        UnitPrice: 4570000,
        Multiple: null
    },
    {
        Name: "TIE Fighter",
        UnitPrice: 75000,
        Multiple: 2
    },
    {
        Name: "Lightsaber",
        UnitPrice: 6000,
        Multiple: 5
    },
    {
        Name: "DLT-19 Heavy Blaster Rifle",
        UnitPrice: 5800,
        Multiple: null
    },
    {
        Name: "DL-44 Heavy Blaster Pistol",
        UnitPrice: 1500,
        Multiple: 10
    }
];

export class ProductsTable1543756386575 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar'
                },
                {
                    name: 'unit_price',
                    type: 'float'
                },
                {
                    name: 'multiple',
                    type: 'int',
                    isNullable: true
                }
            ]
        }), true);

        for (let product of defaultProducts) {
            await queryRunner.query(`INSERT INTO products(name, unit_price, multiple) VALUES ('${product.Name}', ${product.UnitPrice}, ${product.Multiple})`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('products');
    }
}
