import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameEntity } from '../models/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(GameEntity)
    private gameRepository: Repository<GameEntity>,
  ) {}

  // async getAllGames(): Promise<GameEntity[]> {
  //   return this.gameRepository.find();
  // }
  


  // Создание новой игры
  async createGame(playerCount: number, gridSize: number): Promise<GameEntity> {
    const board = this.initializeBoard(gridSize);
    const gameState = {
      board,
      currentPlayer: 1,
      scores: { 1: 0, 2: 0 },
      gridSize,
      playerCount,
    };

    const game = this.gameRepository.create({
      playerCount,
      gridSize,
      gameState: JSON.stringify(gameState),
    });
    return this.gameRepository.save(game);
  }

  // Получение состояния игры
  async getGame(id: number): Promise<GameEntity> {
    const game = await this.gameRepository.findOneBy({ id });
    if (!game) {
      throw new Error('Game not found');
    }
    return game;
  }

  // Обработка хода игрока
  async updateGameState(
    id: number,
    rowIndex: number,
    cellIndex: number,
  ): Promise<{ game: GameEntity; message: string; gameOver: boolean }> {
    const game = await this.gameRepository.findOneBy({ id });
    if (!game) throw new Error('Game not found');

    const gameState = JSON.parse(game.gameState);

    const cell = gameState.board[rowIndex][cellIndex];
    if (cell.isRevealed) {
      throw new Error('Cell is already revealed');
    }

    cell.isRevealed = true;
    let message = 'Пусто!';
    if (cell.hasDiamond) {
      gameState.scores[gameState.currentPlayer]++;
      message = `Игрок ${gameState.currentPlayer} нашел алмаз!`;
    } else {
      message = `Окружающие алмазы: ${cell.surroundingDiamonds}`;
      gameState.currentPlayer = gameState.currentPlayer === 1 ? 2 : 1;
    }

    // Проверка завершения игры
    const gameOver = this.checkGameOver(gameState.board);
    if (gameOver) {
      const winner = gameState.scores[1] > gameState.scores[2] ? 'Игрок 1' :
                     gameState.scores[1] < gameState.scores[2] ? 'Игрок 2' : 'Ничья';
      message = `Игра окончена! Победитель: ${winner}`;
    }

    // Обновляем состояние игры в базе данных
    game.gameState = JSON.stringify(gameState);
    await this.gameRepository.save(game);

    return { game, message, gameOver };
  }

  // Метод для инициализации игрового поля
  private initializeBoard(gridSize: number) {
    const board = Array.from({ length: gridSize }, () =>
      Array.from({ length: gridSize }, () => ({
        hasDiamond: Math.random() < 0.2,
        isRevealed: false,
        surroundingDiamonds: 0,
      })),
    );

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (!board[row][col].hasDiamond) {
          board[row][col].surroundingDiamonds = this.countSurroundingDiamonds(board, row, col);
        }
      }
    }

    return board;
  }

  // Подсчет количества алмазов вокруг клетки
  private countSurroundingDiamonds(board, row, col) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (
          newRow >= 0 &&
          newRow < board.length &&
          newCol >= 0 &&
          newCol < board.length &&
          board[newRow][newCol].hasDiamond
        ) {
          count++;
        }
      }
    }
    return count;
  }

  // Проверка завершения игры
  private checkGameOver(board) {
    return board.flat().every(cell => cell.isRevealed || cell.hasDiamond);
  }
}


