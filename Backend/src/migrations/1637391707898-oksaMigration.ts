import {MigrationInterface, QueryRunner} from "typeorm";

export class oksaMigration1637391707898 implements MigrationInterface {
    name = 'oksaMigration1637391707898'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teams" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" uuid NOT NULL, "lastModified" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastModifiedBy" uuid NOT NULL, "name" character varying NOT NULL, "organisationUuid" uuid, CONSTRAINT "PK_59dcc55c0af733a59470895cce6" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "teams_users_profiles" ("teamsUuid" uuid NOT NULL, "profilesUuid" uuid NOT NULL, CONSTRAINT "PK_860650bb325c183b2ed758716fd" PRIMARY KEY ("teamsUuid", "profilesUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b71a1c2169655cefe9e8b268c0" ON "teams_users_profiles" ("teamsUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_6fca2a190660cdd8f7b9ccf870" ON "teams_users_profiles" ("profilesUuid") `);
        await queryRunner.query(`CREATE TABLE "teams_admins_profiles" ("teamsUuid" uuid NOT NULL, "profilesUuid" uuid NOT NULL, CONSTRAINT "PK_2a2962e6807da07a44c83ec3601" PRIMARY KEY ("teamsUuid", "profilesUuid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_eb7f1b1e76bb7ee22c24dd53c3" ON "teams_admins_profiles" ("teamsUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_8086dfc61547d53a2a334c6d75" ON "teams_admins_profiles" ("profilesUuid") `);
        await queryRunner.query(`ALTER TABLE "public"."meetings" ADD "teamUuid" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "public"."cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`ALTER TABLE "public"."profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings" ADD CONSTRAINT "FK_7f76bfce99c9d8ea38c7fcd85fc" FOREIGN KEY ("teamUuid") REFERENCES "teams"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams" ADD CONSTRAINT "FK_3193d53fa6194c3208b224aff7a" FOREIGN KEY ("organisationUuid") REFERENCES "organisations"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams_users_profiles" ADD CONSTRAINT "FK_b71a1c2169655cefe9e8b268c05" FOREIGN KEY ("teamsUuid") REFERENCES "teams"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teams_users_profiles" ADD CONSTRAINT "FK_6fca2a190660cdd8f7b9ccf870a" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "teams_admins_profiles" ADD CONSTRAINT "FK_eb7f1b1e76bb7ee22c24dd53c3f" FOREIGN KEY ("teamsUuid") REFERENCES "teams"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "teams_admins_profiles" ADD CONSTRAINT "FK_8086dfc61547d53a2a334c6d753" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teams_admins_profiles" DROP CONSTRAINT "FK_8086dfc61547d53a2a334c6d753"`);
        await queryRunner.query(`ALTER TABLE "teams_admins_profiles" DROP CONSTRAINT "FK_eb7f1b1e76bb7ee22c24dd53c3f"`);
        await queryRunner.query(`ALTER TABLE "teams_users_profiles" DROP CONSTRAINT "FK_6fca2a190660cdd8f7b9ccf870a"`);
        await queryRunner.query(`ALTER TABLE "teams_users_profiles" DROP CONSTRAINT "FK_b71a1c2169655cefe9e8b268c05"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "public"."cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`ALTER TABLE "public"."cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`ALTER TABLE "public"."profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`ALTER TABLE "teams" DROP CONSTRAINT "FK_3193d53fa6194c3208b224aff7a"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings" DROP CONSTRAINT "FK_7f76bfce99c9d8ea38c7fcd85fc"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."meetings" DROP COLUMN "teamUuid"`);
        await queryRunner.query(`DROP INDEX "IDX_8086dfc61547d53a2a334c6d75"`);
        await queryRunner.query(`DROP INDEX "IDX_eb7f1b1e76bb7ee22c24dd53c3"`);
        await queryRunner.query(`DROP TABLE "teams_admins_profiles"`);
        await queryRunner.query(`DROP INDEX "IDX_6fca2a190660cdd8f7b9ccf870"`);
        await queryRunner.query(`DROP INDEX "IDX_b71a1c2169655cefe9e8b268c0"`);
        await queryRunner.query(`DROP TABLE "teams_users_profiles"`);
        await queryRunner.query(`DROP TABLE "teams"`);
    }

}
