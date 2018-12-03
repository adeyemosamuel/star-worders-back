import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class OrderItemsTable1543757873200 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'order_items',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'quantity',
                    type: 'int'
                },
                {
                    name: 'unit_price',
                    type: 'float'
                },
                {
                    name: 'order_id',
                    type: 'int'
                },
                {
                    name: 'product_id',
                    type: 'int'
                }
            ]
        }), true);
        await queryRunner.createForeignKey('order_items', new TableForeignKey({
            columnNames: ['order_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'orders',
            onDelete: 'CASCADE'
        }));
        await queryRunner.createForeignKey('order_items', new TableForeignKey({
            columnNames: ['product_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'products'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('order_items');
        const orderForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
        await queryRunner.dropForeignKey('order_items', orderForeignKey);
        const productForeignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
        await queryRunner.dropForeignKey('order_items', productForeignKey);
        await queryRunner.dropTable('order_items');
    }
}
