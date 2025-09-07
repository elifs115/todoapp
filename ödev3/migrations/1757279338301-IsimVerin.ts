import { MigrationInterface, QueryRunner } from "typeorm";

export class IsimVerin1757279338301 implements MigrationInterface {
    name = 'IsimVerin1757279338301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" ADD "priority" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "priority"`);
    }

}
