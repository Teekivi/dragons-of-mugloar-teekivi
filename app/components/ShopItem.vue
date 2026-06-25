<script setup lang="ts">
const { id, name, cost } = defineProps<{
  id: string;
  name: string;
  cost: number;
  state?: ItemState;
}>();

const toastsStore = useToastsStore();

const { buyShopItem, isGameManuallyPlayable, isLoading } = useMugloar();

const handleBuyShopItem = async () => {
  const response = await buyShopItem(id);
  if (response?.shoppingSuccess) {
    toastsStore.addToastWithMessage(`Bought ${name} for ${cost} gold`);
  } else {
    toastsStore.addToastWithMessage(`Failed to buy ${name} for ${cost} gold`);
  }
};
</script>

<template>
  <BaseItem
    :label="name"
    :sublabel="`Cost: ${cost} gold`"
    :buttonLabel="'Buy'"
    :buttonDisabled="isLoading || !isGameManuallyPlayable"
    :state="state"
    @buttonClick="handleBuyShopItem"
  />
</template>
