<script setup lang="ts">
defineProps<{
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  // encrypted?
  probability: string;
}>();

const { solveMessage, isLoading } = useMugloar();
</script>

<template>
  <div class="flex p-2 odd:bg-amber-900">
    <div class="flex-1">
      <div class="text-sm text-amber-300">{{ message }}</div>
      <div class="text-xs text-white">
        Reward: +{{ reward }} gold, Expires in: {{ expiresIn }} turn{{
          expiresIn > 1 ? 's' : ''
        }}, Probability:
        {{ probability }}
      </div>
    </div>
    <Button :disabled="isLoading" @click="solveMessage(adId)">Solve</Button>
  </div>
</template>
