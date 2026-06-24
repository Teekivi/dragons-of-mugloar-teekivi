<script setup lang="ts">
useHead({
  title: 'Dragons of Mugloar',
  bodyAttrs: {
    class: 'bg-amber-950',
  },
});

const { startGame, isLoading, isGameOver } = useMugloar();

const isGameOverOverlayOpen = ref(false);
watch(isGameOver, (newValue) => {
  if (newValue) {
    isGameOverOverlayOpen.value = true;
  }
});
</script>

<template>
  <div
    class="mx-auto my-8 flex max-w-[800px] flex-col items-start gap-4 rounded-xl bg-amber-900 p-4"
  >
    <h1 class="font-cinzel text-xl text-amber-300">Dragons of Mugloar</h1>
    <Button :disabled="isLoading" @click="startGame">New Game</Button>
    <StateDisplay />
    <TasksAndShopTabs />
    <GameOverOverlay
      :isOpen="isGameOverOverlayOpen"
      @close="isGameOverOverlayOpen = false"
    />
  </div>
</template>
