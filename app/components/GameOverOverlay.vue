<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();
</script>

<template>
  <template v-if="isOpen">
    <div class="fixed inset-0 bg-black opacity-70" />
    <div
      class="font-cinzel fixed left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform flex-col gap-4 rounded-xl bg-amber-900 p-6"
    >
      <div class="font-cinzel text-2xl font-bold text-amber-300">Game Over</div>
      <div class="font-crimson text-white">Better luck next time!</div>
      <Button @click="$emit('close')">OK</Button>
    </div>
  </template>
</template>
