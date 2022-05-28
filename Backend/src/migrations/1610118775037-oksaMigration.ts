import {MigrationInterface, QueryRunner} from "typeorm";

export class oksaMigration1610118775037 implements MigrationInterface {
    name = 'oksaMigration1610118775037'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cards" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" uuid NOT NULL, "lastModified" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastModifiedBy" uuid NOT NULL, "author" character varying(300) NOT NULL, "categories" text, "content" text NOT NULL, "dates" jsonb, "deleted" boolean NOT NULL, "meetingID" character varying(11) NOT NULL, "status" character varying(50) NOT NULL, "title" character varying(300) NOT NULL, "votes" jsonb, "remover" character varying(36), "deletedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_cb3789f0e79e124e5753da0010a" PRIMARY KEY ("uuid"))`);
        await queryRunner.query(`CREATE TABLE "meetings" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" uuid NOT NULL, "lastModified" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastModifiedBy" uuid NOT NULL, "id" character varying(11) NOT NULL, "creatorName" character varying(300) NOT NULL, "creatorPhoneNumber" character varying(20), "creatorEmail" character varying(300), "password" character varying(300) NOT NULL, "status" character varying(50) NOT NULL, "name" character varying(300) NOT NULL, "authorizedUsers" text NOT NULL, CONSTRAINT "UQ_aa73be861afa77eb4ed31f3ed57" UNIQUE ("id"), CONSTRAINT "PK_4cd89775d1ca34ae4110fc24fc9" PRIMARY KEY ("uuid"))`);
        // await queryRunner.query(`CREATE TABLE "secrets" ("name" character varying NOT NULL, "value" character varying(300) NOT NULL, CONSTRAINT "PK_0a802e5451589b0a8a816669655" PRIMARY KEY ("name"))`);
        await queryRunner.query(`CREATE TABLE "users" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "createdBy" uuid NOT NULL, "lastModified" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "lastModifiedBy" uuid NOT NULL, "authToken" character varying(300) NOT NULL, "refreshToken" character varying(300) NOT NULL, "phoneNumber" character varying(20), "email" character varying(300), "name" character varying(300) NOT NULL, "loginCode" character varying(6), "codeUsed" boolean NOT NULL, "cards" text NOT NULL, "meetings" text NOT NULL, CONSTRAINT "PK_951b8f1dfc94ac1d0301a14b7e1" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "secrets"`);
        await queryRunner.query(`DROP TABLE "meetings"`);
        await queryRunner.query(`DROP TABLE "cards"`);
    }

}
