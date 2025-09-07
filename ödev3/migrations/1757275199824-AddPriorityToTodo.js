/**
 * @typedef {import('typeorm').MigrationInterface} MigrationInterface
 */

/**
 * @class
 * @implements {MigrationInterface}
 */
module.exports = class AddPriorityToTodo1757275199824 {
    name = 'AddPriorityToTodo1757275199824'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "todos_user_id_fkey"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "passwordhash"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdat"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "password_hash" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "priority" integer NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "users_username_key"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "users_email_key"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "description" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "completed" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "created_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "updated_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "user_id" DROP NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_TODO_COMPLETED" ON "todos" ("completed") `);
        await queryRunner.query(`CREATE INDEX "IDX_TODO_CREATED_AT" ON "todos" ("created_at") `);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "FK_53511787e1f412d746c4bf223ff" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "todos" DROP CONSTRAINT "FK_53511787e1f412d746c4bf223ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_TODO_CREATED_AT"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_TODO_COMPLETED"`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "user_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "updated_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "created_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ALTER COLUMN "completed" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "description" text`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "todos" ADD "title" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "users_email_key" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "username" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "users_username_key" UNIQUE ("username")`);
        await queryRunner.query(`ALTER TABLE "todos" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password_hash"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdat" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "passwordhash" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todos" ADD CONSTRAINT "todos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
