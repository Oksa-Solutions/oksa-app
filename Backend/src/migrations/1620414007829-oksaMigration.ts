import {MigrationInterface, QueryRunner} from "typeorm";

export class oksaMigration1620414007829 implements MigrationInterface {
    name = 'oksaMigration1620414007829'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "profile_settings" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "background" jsonb NOT NULL, CONSTRAINT "PK_fe78c6b520fb1a223178d02462a" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "subscriptions" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "subscription" character varying NOT NULL, CONSTRAINT "PK_eb660c4a66c2c5d344553401002" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "settingsUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "UQ_2f268e08557333f263d53ea00cd" UNIQUE ("settingsUuid")`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD "subscriptionUuid" uuid`);
        await queryRunner.query(`COMMENT ON COLUMN "organisations"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organisations"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."lastModified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."uuid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."lastModified" IS NULL`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."uuid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."uuid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "logins"."createdAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_2f268e08557333f263d53ea00cd" FOREIGN KEY ("settingsUuid") REFERENCES "profile_settings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_821473c2821d2f24a8e648d1277" FOREIGN KEY ("subscriptionUuid") REFERENCES "subscriptions"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_821473c2821d2f24a8e648d1277"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_2f268e08557333f263d53ea00cd"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`COMMENT ON COLUMN "logins"."createdAt" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "cards"."uuid" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "users"."uuid" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "meetings"."uuid" IS NULL`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "profiles"."created" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organisations"."lastModified" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "organisations"."created" IS NULL`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "subscriptionUuid"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "UQ_2f268e08557333f263d53ea00cd"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP COLUMN "settingsUuid"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
        await queryRunner.query(`DROP TABLE "profile_settings"`);
    }

}
