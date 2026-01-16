import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';

async function bootstrap() {
  const FastifyModule = new FastifyAdapter();

  FastifyModule.enableCors({
    origin: ['http://localhost:4000'],
    methods: 'POST',
  });
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    FastifyModule,
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
