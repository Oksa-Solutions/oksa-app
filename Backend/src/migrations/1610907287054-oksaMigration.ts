import {MigrationInterface, QueryRunner} from "typeorm";

export class oksaMigration1610907287054 implements MigrationInterface {
    name = 'oksaMigration1610907287054'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "categories"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "categories" jsonb`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastModified" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."created" IS NULL`);
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "categories"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "categories" text`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
    }

}
