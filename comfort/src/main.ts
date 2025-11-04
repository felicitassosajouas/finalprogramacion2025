import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  })
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // transform: true,
    // forbidNonWhitelisted: true,
    // transformOptions: {
    //   enableImplicitConversion: true,
    // }
  }))  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
