<template>
  <div id="app">
    <h1>Игра в алмазы</h1>
    <p v-if="gameId">Текущий игрок: {{ currentPlayer === 1 ? 'Игрок 1' : 'Игрок 2' }}</p>
    <p v-if="gameId">Счет: Игрок 1 — {{ scores[1] }} | Игрок 2 — {{ scores[2] }}</p>
    <button @click="startGame">Начать новую игру</button>
    <game-board v-if="gameId" :board="board" @move="handleMove" />
  </div>
</template>

<script>
import axios from 'axios';
import GameBoard from './components/GameBoard.vue';

const API_URL = 'http://localhost:3000/games';

export default {
  name: 'App',
  components: {
    GameBoard
  },
  data() {
    return {
      gameId: null,
      board: [],
      currentPlayer: 1,
      scores: { 1: 0, 2: 0 },
      gridSize: 6
    };
  },
  async mounted() {
    // Попробуем получить ID игры из localStorage
    this.gameId = localStorage.getItem('gameId');
    
    if (this.gameId) {
      // Если ID игры существует, получаем состояние игры
      await this.loadGameState(this.gameId);
    }
  },
  methods: {
    async startGame() {
      try {
        const response = await axios.post(API_URL, {
          playerCount: 2,
          gridSize: this.gridSize
        });
        const game = response.data;

        // Устанавливаем начальное состояние игры
        this.gameId = game.id;
        localStorage.setItem('gameId', this.gameId); // Сохраняем ID игры в localStorage
        const gameState = JSON.parse(game.gameState);
        this.board = gameState.board;
        this.currentPlayer = gameState.currentPlayer;
        this.scores = gameState.scores;

        console.log('Игра началась!', this.board);
      } catch (error) {
        console.error('Ошибка при создании игры:', error);
      }
    },
    async loadGameState(gameId) {
      try {
        const response = await axios.get(`${API_URL}/${gameId}`);
        const game = response.data;

        // Восстанавливаем состояние игры
        this.gameId = game.id;
        const gameState = JSON.parse(game.gameState);
        this.board = gameState.board;
        this.currentPlayer = gameState.currentPlayer;
        this.scores = gameState.scores;

        console.log('Состояние игры загружено!', this.board);
      } catch (error) {
        console.error('Ошибка при загрузке состояния игры:', error);
      }
    },
    async handleMove({ rowIndex, cellIndex }) {
      if (!this.gameId) {
        alert('Игра еще не началась');
        return;
      }

      try {
        const response = await axios.put(`${API_URL}/${this.gameId}/move`, {
          rowIndex,
          cellIndex
        });
        const { game, message, gameOver } = response.data;

        // Обновляем состояние игры после хода
        const gameState = JSON.parse(game.gameState);
        this.board = gameState.board;
        this.currentPlayer = gameState.currentPlayer;
        this.scores = gameState.scores;

        // Отображаем сообщение о результате хода
        alert(message);

        // Проверяем, завершена ли игра
        if (gameOver) {
          alert('Игра завершена!');
          this.gameId = null; // Сбрасываем gameId, чтобы начать новую игру
          localStorage.removeItem('gameId'); // Удаляем gameId из localStorage
        }
      } catch (error) {
        console.error('Ошибка при выполнении хода:', error);
      }
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
button {
  margin: 20px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
