import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Enable CORS for frontend integration
  app.enableCors({
    origin: (requestOrigin, callback) => {
      if (!requestOrigin) return callback(null, true);
      const isAllowed = 
        requestOrigin === 'https://heunets-assessment.vercel.app' ||
        requestOrigin.endsWith('.vercel.app') ||
        requestOrigin.startsWith('http://localhost:') ||
        requestOrigin === 'http://localhost';
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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

  const port = process.env.PORT || 8080;
  await app.listen(port, '0.0.0.0');
  console.log(`TeamBoard Backend Server successfully running on http://0.0.0.0:${port}/api`);
}
bootstrap();

