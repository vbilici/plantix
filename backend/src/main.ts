import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['debug'],
    cors: true // Enable CORS for all origins
  });
  const port = 3001;
  await app.listen(port).catch(error => {
    console.error('Error starting the server:', error.message, error.stack);
    process.exit(1);
  });
  console.log(`Application is running on port ${port}`);
}
bootstrap();