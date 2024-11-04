import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GameEntity } from '../entities/game/models/game.entity'; // Убедитесь, что путь к GameEntity корректный

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',                  // Используем SQLite
  database: 'db.sqlite',           // Название файла базы данных
  entities: [GameEntity],          // Подключаем сущность GameEntity
  synchronize: true,               // Автоматически синхронизировать схему с базой данных (только для разработки)
};
