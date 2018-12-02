import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CustomersTable1543674398753 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'customers',
            columns: [
                {
                    name: 'id',
                    type: 'serial',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar'
                }
            ]
        }), true);

        const names = ['Darth Vader', 'Obi-Wan Kenobi', 'Luke Skywalker', 'Imperador Palpatine', 'Han Solo'];
        for (let name of names) {
            await queryRunner.query(`INSERT INTO customers(name) VALUES ('${name}')`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('customers');
    }
}
