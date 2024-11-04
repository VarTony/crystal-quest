import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameController } from './controllers/game.controller';
import { GameService } from './services/game.service';
import { GameEntity } from './models/game.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GameEntity]) // Подключаем сущность GameEntity к TypeOrmModule
  ],
  controllers: [GameController], // Регистрируем контроллер GameController
  providers: [GameService],       // Регистрируем сервис GameService
  exports: [GameService]           // Экспортируем GameService, если он нужен в других модулях
})
export class GameModule {}
