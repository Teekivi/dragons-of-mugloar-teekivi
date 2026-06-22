<script setup lang="ts">
defineProps<{
  id: string;
  name: string;
  cost: number;
}>();
</script>

<template>
  <div class="flex p-2 odd:bg-amber-900">
    <div class="flex-1">
      <div class="text-sm text-amber-300">{{ name }}</div>
      <div class="text-xs text-white">Cost: {{ cost }} gold</div>
    </div>
    <Button>Buy</Button>
  </div>
</template>
