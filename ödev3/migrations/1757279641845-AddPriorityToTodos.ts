import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriorityToTodos1757279641845 implements MigrationInterface {
    name = 'AddPriorityToTodos1757279641845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" ADD "priority" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "priority"`);
    }

}
