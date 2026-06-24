<script setup lang="ts">
defineProps<{
  title: string;
  noItemsMessage: string | null;
  isActiveTab: boolean;
  isLoading: boolean;
}>();

defineEmits<{
  refresh: [];
}>();

const { isGameStarted, isGameOver } = useMugloar();
</script>

<template>
  <div :class="['lg:block', { hidden: !isActiveTab }]">
    <div class="mb-2 hidden items-center justify-between lg:flex">
      <div class="font-cinzel text-lg text-amber-300">{{ title }}:</div>
      <div class="my-1 ml-1 mr-2">
        <Button
          small
          :disabled="!isGameStarted || isLoading || isGameOver"
          @click="$emit('refresh')"
        >
          Refresh
        </Button>
      </div>
    </div>
    <div class="rounded-b-lg bg-amber-800 p-2">
      <slot />
      <div v-if="noItemsMessage" class="p-4 text-center text-amber-300">
        {{ noItemsMessage }}
      </div>
    </div>
  </div>
</template>
