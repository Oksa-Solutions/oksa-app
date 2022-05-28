import {MigrationInterface, QueryRunner} from "typeorm";

export class oksaMigration1610287803909 implements MigrationInterface {
    name = 'oksaMigration1610287803909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings" ADD "categories" jsonb`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
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
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
        await queryRunner.query(`ALTER TABLE "meetings" DROP COLUMN "categories"`);
    }

}
