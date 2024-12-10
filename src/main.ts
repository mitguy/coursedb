import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

const multipart = require('@fastify/multipart');

(async () => {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
    { logger: ['error', 'warn'] },
  );

  app.register(multipart);

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);

  console.log(await app.getUrl());
})();