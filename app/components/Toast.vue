<script setup lang="ts">
const { id, message } = defineProps<{
  id: string;
  message: string;
}>();

const toastsStore = useToastsStore();

const timer = setTimeout(() => toastsStore.removeToastById(id), 5000);
onUnmounted(() => clearTimeout(timer));
</script>

<template>
  <div
    class="font-crimson flex w-[400px] items-center justify-between gap-4 rounded-xl bg-amber-500 p-4 text-black"
  >
    <div>{{ message }}</div>
    <Button small @click="toastsStore.removeToastById(id)">
      &nbsp;X&nbsp;
    </Button>
  </div>
</template>
