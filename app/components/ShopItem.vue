<script setup lang="ts">
defineProps<{
  id: string;
  name: string;
  cost: number;
}>();

const { buyShopItem, isLoading } = useMugloar();
</script>

<template>
  <div class="flex p-2 odd:bg-amber-900">
    <div class="flex-1">
      <div class="text-sm text-amber-300">{{ name }}</div>
      <div class="text-xs text-white">Cost: {{ cost }} gold</div>
    </div>
    <Button :disabled="isLoading" @click="buyShopItem(id)">Buy</Button>
  </div>
</template>
