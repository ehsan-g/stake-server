import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

let context: INestApplication = null;
export const ApplicationContext = async () => {
  if (!context) {
    context = await NestFactory.create(AppModule, {
      cors: {
        allowedHeaders: ['Content-Type', 'Authorization'],
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      },
    });
    const options = new DocumentBuilder()
      .setTitle('Test Title')
      .setDescription('Test API')
      .setVersion('v0.1.0')
      .addServer(`http://localhost:5000/`, 'Example Server')
      .addTag('BigQuery')
      .build();
    const document = SwaggerModule.createDocument(context, options);
    SwaggerModule.setup('docs', context, document);
    return context;
  }
};
