import {MigrationInterface, QueryRunner} from "typeorm";

export class oksaMigration1622805674715 implements MigrationInterface {
    name = 'oksaMigration1622805674715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" DROP CONSTRAINT "FK_2a0c030e77a63054608cef60ef4"`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" DROP CONSTRAINT "FK_e935310791f2d1e4091209b7b3b"`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" DROP CONSTRAINT "FK_986334cc957a25de07392a219ea"`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" DROP CONSTRAINT "FK_f24366216dd88e7a05df85cf346"`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "organisations" ADD "contactPerson" character varying`);
        await queryRunner.query(`ALTER TABLE "organisations" ADD "contactEmail" character varying`);
        await queryRunner.query(`ALTER TABLE "organisations" ALTER COLUMN "created" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "organisations" ALTER COLUMN "lastModified" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "created" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "lastModified" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "created" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "lastModified" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastModified" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "created" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "lastModified" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "logins" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" ADD CONSTRAINT "FK_e935310791f2d1e4091209b7b3b" FOREIGN KEY ("organisationsUuid") REFERENCES "organisations"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" ADD CONSTRAINT "FK_2a0c030e77a63054608cef60ef4" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" ADD CONSTRAINT "FK_f24366216dd88e7a05df85cf346" FOREIGN KEY ("organisationsUuid") REFERENCES "organisations"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" ADD CONSTRAINT "FK_986334cc957a25de07392a219ea" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4"`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" DROP CONSTRAINT "FK_486f56b0164bb7db47bca1015f8"`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" DROP CONSTRAINT "FK_986334cc957a25de07392a219ea"`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" DROP CONSTRAINT "FK_f24366216dd88e7a05df85cf346"`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" DROP CONSTRAINT "FK_2a0c030e77a63054608cef60ef4"`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" DROP CONSTRAINT "FK_e935310791f2d1e4091209b7b3b"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_806da3a699248dec86bd083167c"`);
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746"`);
        await queryRunner.query(`ALTER TABLE "profiles" DROP CONSTRAINT "FK_ad26f60abdd1f712200831d35f2"`);
        await queryRunner.query(`ALTER TABLE "logins" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "lastModified" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "lastModified" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "profiles" ADD CONSTRAINT "FK_ad26f60abdd1f712200831d35f2" FOREIGN KEY ("userUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_cbb0c0798d4606401fe5ccb0746" FOREIGN KEY ("authorUuid") REFERENCES "users"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "lastModified" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "meetings" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_806da3a699248dec86bd083167c" FOREIGN KEY ("meetingUuid") REFERENCES "meetings"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "lastModified" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "profiles" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "organisations" ALTER COLUMN "lastModified" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "organisations" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "organisations" DROP COLUMN "contactEmail"`);
        await queryRunner.query(`ALTER TABLE "organisations" DROP COLUMN "contactPerson"`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_486f56b0164bb7db47bca1015f8" FOREIGN KEY ("meetingsUuid") REFERENCES "meetings"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meetings_authorized_users_users" ADD CONSTRAINT "FK_27a9a054491732acc0cc3ed38a4" FOREIGN KEY ("usersUuid") REFERENCES "users"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" ADD CONSTRAINT "FK_f24366216dd88e7a05df85cf346" FOREIGN KEY ("organisationsUuid") REFERENCES "organisations"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organisations_admins_profiles" ADD CONSTRAINT "FK_986334cc957a25de07392a219ea" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" ADD CONSTRAINT "FK_e935310791f2d1e4091209b7b3b" FOREIGN KEY ("organisationsUuid") REFERENCES "organisations"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "organisations_users_profiles" ADD CONSTRAINT "FK_2a0c030e77a63054608cef60ef4" FOREIGN KEY ("profilesUuid") REFERENCES "profiles"("uuid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
