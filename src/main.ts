import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: {
    origin: true
  } });

  const config = new DocumentBuilder()
    .setTitle('Telega')
    .setDescription('The telega API description')
    .setVersion('1.0')
    .addTag('telega')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
