import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1736862059314 implements MigrationInterface {
    name = 'Init1736862059314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "greeted" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "greeted"`);
    }

}
