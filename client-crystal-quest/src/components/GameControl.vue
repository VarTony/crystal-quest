<template>
  <div class="game-controls">
    <button @click="startGame">Начать игру</button>
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      this.$emit('start');
    }
  }
}
</script>

<style scoped>
.game-controls {
  padding: 20px;
  text-align: center;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
