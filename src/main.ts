import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3099;
  
  app.enableCors({
    // origin: [
      //   "http://localhost:3000",
      //   "http://127.0.0.1:3000",
      // ],
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,          // removes extra fields
      transform: true,          // converts types automatically
      forbidNonWhitelisted: true,
    }),
  );
    
    app.setGlobalPrefix('api');
    setupSwagger(app);
    const server = await app.listen(port);
    
  // const addr = server.address();
  // const host = addr.address === '::' ? 'localhost' : addr.address;

  // const baseUrl = `http://${host}:${addr.port}/api`;


  //  const host = process.env.HOST || '0.0.0.0';
  //  const port = process.env.PORT || 3088;
  //  await app.listen(port, host);
  // console.log(` Server running on ${await app.getUrl()}`);
  const baseUrl = await app.getUrl();


  console.log(`Server running at: ${baseUrl}/api`);
}
bootstrap();
