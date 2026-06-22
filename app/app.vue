<script setup lang="ts">
import { exampleTasks, exampleShopItems } from './exampleData';

useHead({
  title: 'Dragons of Mugloar',
  bodyAttrs: {
    class: 'bg-amber-950',
  },
});

const activeTab = ref<'tasks' | 'shop'>('tasks');
</script>

<template>
  <div
    class="mx-auto my-8 flex max-w-[800px] flex-col items-start gap-4 rounded-xl bg-amber-900 p-4"
  >
    <h1 class="text-xl text-amber-300">Dragons of Mugloar</h1>

    <Button>New Game</Button>

    <div class="flex flex-wrap gap-x-6 gap-y-4">
      <div>
        <h2 class="mb-2 text-lg text-amber-300">Stats:</h2>
        <div class="flex flex-wrap gap-2">
          <StateElement label="Lives" :value="3" />
          <StateElement label="Gold" :value="0" />
          <StateElement label="Level" :value="0" />
          <StateElement label="Score" :value="0" />
          <StateElement label="HiScore" :value="0" />
          <StateElement label="Turn" :value="0" />
        </div>
      </div>
      <div>
        <h2 class="mb-2 flex items-center gap-2 text-lg text-amber-300">
          Reputation: <Button small>Investigate</Button>
        </h2>
        <div class="flex flex-wrap gap-2">
          <StateElement label="People" :value="3" />
          <StateElement label="State" :value="0" />
          <StateElement label="Underworld" :value="0" />
        </div>
      </div>
    </div>

    <div class="self-stretch">
      <div class="flex">
        <Tab :active="activeTab === 'tasks'" @click="activeTab = 'tasks'"
          >Tasks</Tab
        >
        <Tab :active="activeTab === 'shop'" @click="activeTab = 'shop'"
          >Shop</Tab
        >
        <div class="flex-1" />
        <div class="my-1 ml-1 mr-2">
          <Button small>Refresh</Button>
        </div>
      </div>
      <div class="rounded-b-lg bg-amber-800 p-2">
        <Task
          v-if="activeTab === 'tasks'"
          v-for="task in exampleTasks"
          :key="task.adId"
          v-bind="task"
        />
        <ShopItem
          v-if="activeTab === 'shop'"
          v-for="item in exampleShopItems"
          :key="item.id"
          v-bind="item"
        />
      </div>
    </div>
  </div>
</template>
