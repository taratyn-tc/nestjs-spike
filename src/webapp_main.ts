import { NestFactory } from '@nestjs/core';
import { WebappModule } from './modules/webapp/webapp.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(WebappModule);
  app.useGlobalPipes(new ValidationPipe( {transform: true} ));

  const config = new DocumentBuilder()
    .setTitle('greeter example')
    .setDescription('The greeter API description')
    .setVersion('1.0')
    .addTag('greeter')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config, {});
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
