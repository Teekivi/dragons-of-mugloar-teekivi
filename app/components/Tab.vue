<script setup lang="ts">
defineProps<{
  active: boolean;
}>();
</script>

<template>
  <button
    :class="[
      'font-crimson rounded-t-lg border border-amber-800 px-4 py-2',
      active
        ? 'bg-amber-800 text-white'
        : 'bg-amber-900 text-amber-400 hover:bg-amber-700',
    ]"
  >
    <slot />
  </button>
</template>
