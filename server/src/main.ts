import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as session from 'express-session';
import * as passport from 'passport';

import { TypeormStore } from 'connect-typeorm/out';
import MysqlDataSource from './typeorm/MysqlDataSource';
import { Session } from './typeorm/entities';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const sessionRepository = MysqlDataSource.getRepository(Session);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({ origin: ['http://localhost:5173'], credentials: true });

  app.use(
    session({
      secret: 'COOKIE_SECRET', // move cookie secret to .env
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 86400000, // cookie expires 1 day later
      },
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false, // If using MariaDB.
        ttl: 86400,
      }).connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3001);
}
bootstrap();
