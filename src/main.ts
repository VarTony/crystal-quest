import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включение CORS
  app.enableCors({
    origin: 'http://localhost:8080', // Укажите адрес вашего клиента
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Настройка Swagger для документирования API
  const config = new DocumentBuilder()
    .setTitle('Crystal Quest API')
    .setDescription('API для игры в алмазы')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Запуск сервера на порту 3000
  const port = 3000;
  await app.listen(port);
  Logger.log(`Приложение запущено на: http://localhost:${port}`);
}

bootstrap();
