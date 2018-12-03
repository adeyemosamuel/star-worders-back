import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class OrdersTable1543757868407 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'orders',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'customer_id',
                    type: 'int'
                }
            ]
        }), true);

        await queryRunner.createForeignKey('orders', new TableForeignKey({
            columnNames: ['customer_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'customers'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        const table = await queryRunner.getTable('orders');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('customer_id') !== -1);
        await queryRunner.dropForeignKey('orders', foreignKey);
        await queryRunner.dropTable('orders');
    }

}
