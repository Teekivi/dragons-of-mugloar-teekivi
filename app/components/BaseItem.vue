<script setup lang="ts">
defineProps<{
  label: string;
  sublabel: string;
  buttonLabel: string;
  buttonDisabled: boolean;
  state?: ItemState;
}>();

defineEmits<{
  buttonClick: [];
}>();
</script>

<template>
  <div
    :class="[
      'flex gap-2 border-2 p-2 odd:bg-amber-900',
      {
        'border-transparent': !state,
        'border-amber-400': state === ItemState.CHOSEN,
        'border-green-400': state === ItemState.SUCCESS,
        'border-red-400': state === ItemState.FAILED,
      },
    ]"
  >
    <div class="flex-1">
      <div class="text-md font-crimson text-amber-300">{{ label }}</div>
      <div class="font-crimson text-sm text-white">{{ sublabel }}</div>
    </div>
    <Button :disabled="buttonDisabled" @click="$emit('buttonClick')">
      {{ buttonLabel }}
    </Button>
  </div>
</template>
