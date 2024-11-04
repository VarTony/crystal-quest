import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from './entities/game/game.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig), // Подключаем TypeORM с конфигурацией
    GameModule                             // Подключаем GameModule к приложению
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
