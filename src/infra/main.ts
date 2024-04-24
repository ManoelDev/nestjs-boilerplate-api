/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { EnvironmentService } from './environment/environment.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });
  const environmentService = app.get(EnvironmentService);

  app.useLogger(false);

  if (environmentService.get('NODE_ENV') === 'development') {
    const config = new DocumentBuilder().setTitle('API').setDescription('API description').setVersion('1.0').build();
    SwaggerModule.setup('developer', app, SwaggerModule.createDocument(app, config));
  }

  await app.listen(environmentService.get('PORT'));
  console.log(`Application is running on: ${await app.getUrl()}`);
  if (environmentService.get('NODE_ENV')) console.log(`Swagger is running on: ${await app.getUrl()}/developer`);
}
bootstrap();
