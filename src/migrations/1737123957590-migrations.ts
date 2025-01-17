import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1737123957590 implements MigrationInterface {
    name = 'Migrations1737123957590'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_greeted" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "formality" varchar NOT NULL DEFAULT ('normal'))`);
        await queryRunner.query(`INSERT INTO "temporary_greeted"("id", "name") SELECT "id", "name" FROM "greeted"`);
        await queryRunner.query(`DROP TABLE "greeted"`);
        await queryRunner.query(`ALTER TABLE "temporary_greeted" RENAME TO "greeted"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "greeted" RENAME TO "temporary_greeted"`);
        await queryRunner.query(`CREATE TABLE "greeted" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`INSERT INTO "greeted"("id", "name") SELECT "id", "name" FROM "temporary_greeted"`);
        await queryRunner.query(`DROP TABLE "temporary_greeted"`);
    }

}
