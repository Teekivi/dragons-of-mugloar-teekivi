<script setup lang="ts">
defineProps<{
  small?: boolean;
  disabled?: boolean;
}>();
</script>

<template>
  <button
    :disabled="disabled"
    :class="[
      'inline-flex items-center gap-1 rounded-md bg-amber-700 font-crimson text-white',
      disabled ? 'opacity-50' : 'hover:bg-amber-600 active:bg-amber-500',
      small ? 'p-1 text-sm' : 'p-2',
    ]"
  >
    <slot />
  </button>
</template>
