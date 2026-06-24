<script setup lang="ts">
defineProps<{
  label: string;
  value: number | null;
}>();
</script>

<template>
  <div class="rounded-xl bg-amber-800 p-2">
    <div class="font-crimson text-sm uppercase text-amber-300">{{ label }}</div>
    <div class="font-crimson text-md text-center font-bold text-white">
      {{ value != null ? Number(value.toFixed(1)) : '-' }}
    </div>
  </div>
</template>
