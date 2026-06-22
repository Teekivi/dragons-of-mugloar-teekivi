<script setup lang="ts">
defineProps<{
  label: string;
  value: number;
}>();
</script>

<template>
  <div class="rounded-xl bg-amber-800 p-2">
    <div class="text-xs uppercase text-amber-300">{{ label }}</div>
    <div class="text-center font-bold text-white">{{ value }}</div>
  </div>
</template>
