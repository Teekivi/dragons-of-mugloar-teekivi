<script setup lang="ts">
import { exampleTasks, exampleShopItems } from '../exampleData';

const activeTab = ref<'tasks' | 'shop'>('tasks');
</script>

<template>
  <div class="self-stretch">
    <div class="flex">
      <Tab :active="activeTab === 'tasks'" @click="activeTab = 'tasks'">
        Tasks
      </Tab>
      <Tab :active="activeTab === 'shop'" @click="activeTab = 'shop'">
        Shop
      </Tab>
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
</template>
