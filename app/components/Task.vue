<script setup lang="ts">
defineProps<{
  message: string;
  reward: number;
  expiresIn: number;
  // encrypted?
  probability: string;
}>();
</script>

<template>
  <div class="flex p-2 odd:bg-amber-900">
    <div class="flex-1">
      <div class="text-sm text-amber-300">{{ message }}</div>
      <div class="text-xs text-white">
        Reward: +{{ reward }} gold, Expires in: {{ expiresIn }} turn{{
          expiresIn > 1 ? "s" : ""
        }}, Probability:
        {{ probability }}
      </div>
    </div>
    <Button>Solve</Button>
  </div>
</template>
