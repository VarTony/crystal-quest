import { Controller, Post, Get, Body, Param, Put } from '@nestjs/common';
import { GameService } from '../services/game.service';
import { GameEntity } from '../models/game.entity';
import { CreateGameDto, UpdateGameStateDto } from '../DTOs';

@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  // Создание новой игры
  @Post()
  async createGame(@Body() createGameDto: CreateGameDto): Promise<GameEntity> {
    return this.gameService.createGame(createGameDto.playerCount, createGameDto.gridSize);
  }

  // Получение состояния игры по ID
  @Get(':id')
  async getGame(@Param('id') id: number): Promise<GameEntity> {
    return this.gameService.getGame(id);
  }

  // Обработка хода игрока
  @Put(':id/move')
  async updateGameState(
    @Param('id') id: number,
    @Body() updateGameStateDto: UpdateGameStateDto,
  ): Promise<{ game: GameEntity; message: string; gameOver: boolean }> {
    const { rowIndex, cellIndex } = updateGameStateDto;
    return this.gameService.updateGameState(id, rowIndex, cellIndex);
  }

  // Получение списка всех игр
//   @Get()
//   async getAllGames(): Promise<GameEntity[]> {
//     return this.gameService.getAllGames(); // Метод, который вам нужно реализовать в GameService
//   }
}
