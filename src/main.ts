import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';

import { ErrorsInterceptor } from './interceptors/http-errors.interceptor';
import { AppModule } from './app.module';
import { ConfigurationService } from './configuration/services/configuration.service';

async function bootstrap() {
  const config = new ConfigurationService();
  const app = await NestFactory.create(AppModule);

  // Enable API versioning
  // https://docs.nestjs.com/techniques/versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Enable ValidationPipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable ErrorsInterceptor for handling errors
  app.useGlobalInterceptors(new ErrorsInterceptor());

  // Start the app
  await app.listen(config.get('PORT'));
}
bootstrap();
