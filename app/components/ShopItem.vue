<script setup lang="ts">
defineProps<{
  id: string;
  name: string;
  cost: number;
}>();

const { buyShopItem, isGameOver, isLoading } = useMugloar();
</script>

<template>
  <BaseItem
    :label="name"
    :sublabel="`Cost: ${cost} gold`"
    :buttonLabel="'Buy'"
    :buttonDisabled="isLoading || isGameOver"
    @buttonClick="buyShopItem(id)"
  />
</template>
