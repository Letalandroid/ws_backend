import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  console.log(process.env.FRONT_URL);
  app.enableCors({
    origin: process.env.FRONT_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
