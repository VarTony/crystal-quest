<template>
  <div class="game-board">
    <div v-for="(row, rowIndex) in board" :key="`row-${rowIndex}`" class="board-row">
      <game-cell 
        v-for="(cell, cellIndex) in row" 
        :key="`cell-${rowIndex}-${cellIndex}`" 
        :hasDiamond="cell.hasDiamond" 
        :isRevealed="cell.isRevealed" 
        @click="makeMove(rowIndex, cellIndex)" 
      />
    </div>
  </div>
</template>

<script>
import GameCell from './GameCell.vue';

export default {
  components: {
    GameCell
  },
  props: {
    board: Array
  },
  methods: {
    makeMove(rowIndex, cellIndex) {
      this.$emit('move', { rowIndex, cellIndex });
    }
  }
}
</script>

<style scoped>
.game-board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.board-row {
  display: flex;
}
</style>
