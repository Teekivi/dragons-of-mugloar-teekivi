<script setup lang="ts">
defineProps<{
  label: string;
  sublabel: string;
  buttonLabel: string;
  buttonDisabled: boolean;
}>();

defineEmits<{
  buttonClick: [];
}>();
</script>

<template>
  <div class="flex gap-2 p-2 odd:bg-amber-900">
    <div class="flex-1">
      <div class="font-crimson text-md text-amber-300">{{ label }}</div>
      <div class="font-crimson text-sm text-white">{{ sublabel }}</div>
    </div>
    <Button :disabled="buttonDisabled" @click="$emit('buttonClick')">
      {{ buttonLabel }}
    </Button>
  </div>
</template>
