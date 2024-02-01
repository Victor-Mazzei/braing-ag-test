import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import { TypeOrmExceptionFilter } from './global-filters/typeorm-exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  app.setGlobalPrefix('v1/api');

  const config = new DocumentBuilder()
    .setTitle(configService.get('api_title'))
    .setDescription(configService.get('api_description'))
    .setVersion(configService.get('api_version'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc/', app, document);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
  );
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  app.enableCors();
  await app.listen(port);
}
bootstrap();
