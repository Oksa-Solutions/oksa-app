import {MigrationInterface, QueryRunner} from "typeorm";

export class oksaMigration1642798613041 implements MigrationInterface {
    name = 'oksaMigration1642798613041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "public"."cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`ALTER TABLE "public"."profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`CREATE INDEX "IDX_7f76bfce99c9d8ea38c7fcd85f" ON "public"."meetings" ("teamUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_3193d53fa6194c3208b224aff7" ON "public"."teams" ("organisationUuid") `);
        await queryRunner.query(`CREATE INDEX "IDX_821473c2821d2f24a8e648d127" ON "public"."profiles" ("subscriptionUuid") `);
        await queryRunner.query(`ALTER TABLE "public"."profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "public"."cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`ALTER TABLE "public"."cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`ALTER TABLE "public"."profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_821473c2821d2f24a8e648d127"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3193d53fa6194c3208b224aff7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7f76bfce99c9d8ea38c7fcd85f"`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "public"."meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "public"."cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
