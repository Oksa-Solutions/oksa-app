import {INestApplication, ValidationPipe} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';
import {Request} from 'express';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as csurf from 'csurf';

import {AppModule} from './app.module';
import {envResMiddleware} from './common/envRes.middleware';

const createSwaggerDoc = (app: INestApplication) => {
  const options = new DocumentBuilder()
    .setTitle('Oksa App API')
    .setDescription('Oksa App API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(envResMiddleware);
  app.use(helmet());

  app.use(cookieParser());
  if (process.env.STAGE === 'prod') {
    app.enableCors({origin: 'https://oksa.io'});
  } else if (process.env.STAGE === 'dev') {
    app.enableCors({origin: 'https://dev.oksa.io'});
  } else {
    app.enableCors({origin: 'http://localhost:3000'});
  }

  app.use('/m', csurf({cookie: true}));

  app.use(
    morgan(':date :method :url :status :response-time ms :remote-addr', {
      skip: function (req: Request) {
        return (
          req.originalUrl == '/api/' ||
          req.originalUrl.includes('swagger') ||
          req.originalUrl.includes('favicon')
        );
      },
    }),
  );

  if (process.env.STAGE !== 'prod') {
    createSwaggerDoc(app);
  }
  // app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
