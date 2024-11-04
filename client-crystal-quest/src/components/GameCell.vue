<template>
  <div class="cell" :class="{ revealed: isRevealed, diamond: hasDiamond && isRevealed }">
    {{ isRevealed ? (hasDiamond ? '💎' : '') : '' }}
  </div>
</template>

<script>
export default {
  name: 'GameCell',
  props: {
    hasDiamond: {
      type: Boolean,
      default: false
    },
    isRevealed: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.cell {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: white;
}
.revealed {
  background-color: #f0f0f0;
}
.diamond {
  background-color: yellow;
}
</style>

