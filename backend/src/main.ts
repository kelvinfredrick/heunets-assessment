import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend integration
  app.enableCors({
    origin: '*', // For dev ease, allow all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Enable Global Route Prefix
  app.setGlobalPrefix('api');

  // Enable Global Validation Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`TeamBoard Backend Server successfully running on http://localhost:${port}/api`);
}
bootstrap();

