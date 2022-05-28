import {MigrationInterface, QueryRunner} from "typeorm";

export class oksaMigration1618423061642 implements MigrationInterface {
    name = 'oksaMigration1618423061642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "organisations"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organisations"."lastModified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" DROP CONSTRAINT "FK_2a0c030e77a63054608cef60ef4"`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" DROP CONSTRAINT "FK_986334cc957a25de07392a219ea"`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."uuid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."lastModified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."uuid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."lastModified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."uuid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."uuid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "logins"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" ADD CONSTRAINT "FK_2a0c030e77a63054608cef60ef4" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" ADD CONSTRAINT "FK_986334cc957a25de07392a219ea" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" DROP CONSTRAINT "FK_986334cc957a25de07392a219ea"`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" DROP CONSTRAINT "FK_2a0c030e77a63054608cef60ef4"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`COMMENT ON COLUMN "logins"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."uuid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."uuid" IS NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."uuid" IS NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."uuid" IS NULL`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" ADD CONSTRAINT "FK_986334cc957a25de07392a219ea" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" ADD CONSTRAINT "FK_2a0c030e77a63054608cef60ef4" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`COMMENT ON COLUMN "organisations"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organisations"."created" IS NULL`);
    }

}
