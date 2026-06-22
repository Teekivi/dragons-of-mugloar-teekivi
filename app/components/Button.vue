<script setup lang="ts">
defineProps<{
  small?: boolean;
}>();
</script>

<template>
  <button :class="[
    'text-white bg-amber-700 rounded-md hover:bg-amber-600 active:bg-amber-500',
    small ? 'text-sm p-1' : 'p-2'
  ]">
    <slot />
  </button>
</template>
