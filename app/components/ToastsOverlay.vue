<script setup lang="ts">
const toastsStore = useToastsStore();

const toasts = computed(() => toastsStore.toasts);
</script>

<template>
  <div class="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 flex-col gap-4">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :id="toast.id"
      :message="toast.message"
    />
  </div>
</template>
