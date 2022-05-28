import {MigrationInterface, QueryRunner} from "typeorm";

export class oksaMigration1612088139504 implements MigrationInterface {
    name = 'oksaMigration1612088139504'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."lastModified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "authorizedUsers" DROP NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."authorizedUsers" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastModified" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."authorizedUsers" IS NULL`);
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "authorizedUsers" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
    }

}
