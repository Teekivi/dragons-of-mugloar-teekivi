<script setup lang="ts">
const { startGame, isLoading, isGameOver } = useMugloar();
</script>

<template>
  <div class="flex items-center gap-2">
    <Button :disabled="isLoading" @click="startGame">New Game</Button>
    <div v-if="isGameOver" class="font-crimson text-white">
      Game Over. Start a new one?
    </div>
  </div>
</template>
