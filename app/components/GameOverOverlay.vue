<script setup lang="ts">
const { isGameOver } = useMugloar();

const isOpen = ref(false);
watch(isGameOver, (newValue) => {
  if (newValue) {
    isOpen.value = true;
  }
});
</script>

<template>
  <template v-if="isOpen">
    <div class="fixed inset-0 bg-black opacity-70" />
    <div
      class="fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-4 rounded-xl bg-amber-900 p-6 font-cinzel"
    >
      <div class="font-cinzel text-2xl font-bold text-amber-300">Game Over</div>
      <div class="text-center font-crimson text-white">
        Better luck next time!
      </div>
      <Button @click="isOpen = false">OK</Button>
    </div>
  </template>
</template>
