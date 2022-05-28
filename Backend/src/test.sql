query: START TRANSACTION
query: INSERT INTO "organisations"("uuid", "created", "createdBy", "lastModified", "lastModifiedBy", "name", "contactPerson", "contactEmail") VALUES ($1, DEFAULT, $2, DEFAULT, $3, $4, $5, $6) RETURNING "uuid", "created", "lastModified" -- PARAMETERS: ["a497b804-e0e0-4a2b-8888-863f5fbf699d","67ce563f-0777-46a8-a036-56ab2db7a26e","67ce563f-0777-46a8-a036-56ab2db7a26e","test","j","j@g.xo"]
query: INSERT INTO "organisations_admins_profiles"("organisationsUuid", "profilesUuid") VALUES ($1, $2) -- PARAMETERS: ["a497b804-e0e0-4a2b-8888-863f5fbf699d","b6573e4b-33b4-4edb-bc54-b6105f3790fd"]
query: COMMIT

INSERT INTO organisations (name, "createdBy", "lastModifiedBy", "contactPerson", "contactEmail") VALUES ('', (SELECT "createdBy" FROM profiles WHERE email='jore@oksa.io'), (SELECT "createdBy" FROM profiles WHERE email='jore@oksa.io'), '', '');
