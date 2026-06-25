<script setup lang="ts">
import ToastsOverlay from './components/ToastsOverlay.vue';

useHead({
  title: 'Dragons of Mugloar',
  bodyAttrs: {
    class: 'bg-amber-950',
  },
});
</script>

<template>
  <div
    class="mx-auto my-8 flex max-w-[1500px] flex-col items-start gap-4 rounded-xl bg-amber-900 p-4"
  >
    <h1 class="font-cinzel text-xl text-amber-300">Dragons of Mugloar</h1>
    <GameControlsRow />
    <StateDisplay />
    <TasksAndShop />

    <GameOverOverlay />
    <ToastsOverlay />
  </div>
</template>
