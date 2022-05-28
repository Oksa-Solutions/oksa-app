<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

This is template for ElasticBeanstalk implementation.
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation and running the app in containers

Backend is containerized. Copy the .env.example files in the Backend and Frontend folders to .env, then copy PORT and POSTGRES_* into .env file in Oksa folder. Run following commands to start the environment:
```bash
docker-compose up -d --build -V
```

`--build -V` enables hot-reloading in the container

*!NOTE!*
In development environment the sign in form does not send email nor SMS but the OTP is `123456` every time.

## Run only for the first time

Run either of below sections for the first time to initialize database, but __NOT__ both of them.

### Fresh database without any data

Then in the other terminal window after `docker-compose` has finished, login to running container and run migrations with following commands:
```bash
docker exec -ti oksa-backend sh
npm run typeorm:migration:generate -- oksaMigration
npm run build
npm run typeorm:migration:run
exit
```

### Use seed data in database

Copy database dump into container to seed the database after migrations have run.
```
docker cp ./db-seed/oksa_local_010621.sql oksa-database:/home
docker exec -ti oksa-database sh
psql -U postgres oksa_local < /home/oksa_local_010621.sql
```

## Running the app locally

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Database actions
- Launch EC2 instance from template `DB-jump`
- `sudo apt update && sudo apt install postgresql-client-common postgresql-client-12`
- Connect to database `psql --host=terraform-20210119174918812100000002.cs3e8e4ds6p0.eu-north-1.rds.amazonaws.com --port=5432 --username=oksaPostgres --password --dbname=oksa_prod`

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
