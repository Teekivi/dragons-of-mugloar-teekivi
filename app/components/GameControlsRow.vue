<script setup lang="ts">
const {
  startGame,
  isLoading: isLoadingStartGame,
  isGameStarted,
  isGameOver,
} = useMugloar();

const {
  startAutoplay,
  stopAutoplay,
  isLoading: isLoadingAutoplay,
  isAutoplayActive,
} = useAutoplay();

const toggleAutoplay = () => {
  if (isAutoplayActive.value) {
    stopAutoplay();
  } else {
    startAutoplay();
  }
};
</script>

<template>
  <div class="flex items-center gap-2">
    <Button :disabled="isLoadingStartGame" @click="startGame">New Game</Button>
    <div v-if="isGameOver" class="font-crimson text-white">
      Game Over. Start a new one?
    </div>
    <template v-else-if="isGameStarted">
      <Button :disabled="isLoadingAutoplay" @click="toggleAutoplay">
        <Icon :name="isAutoplayActive ? 'mdi:pause' : 'mdi:play'" />
        Autoplay
      </Button>
    </template>
  </div>
</template>
