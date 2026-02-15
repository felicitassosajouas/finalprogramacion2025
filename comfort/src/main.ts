import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // CAMBIO: Ponemos la URL directamente para asegurar que el navegador dé permiso
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));
  
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();