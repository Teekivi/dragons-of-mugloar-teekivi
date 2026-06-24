<script setup lang="ts">
const activeTab = ref<'tasks' | 'shop'>('tasks');

const store = useMugloarStore();
const { fetchMessages, fetchShopItems, isGameStarted, isLoading } =
  useMugloar();

const refresh = () => {
  if (activeTab.value === 'tasks') {
    fetchMessages();
  } else {
    fetchShopItems();
  }
};
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
        <Button small :disabled="!isGameStarted || isLoading" @click="refresh">
          Refresh
        </Button>
      </div>
    </div>
    <div class="rounded-b-lg bg-amber-800 p-2">
      <template v-if="activeTab === 'tasks'">
        <Task
          v-if="store.messages.length > 0"
          v-for="task in store.messages"
          :key="task.adId"
          v-bind="task"
        />
        <div v-else class="p-4 text-center text-amber-300">
          {{
            isGameStarted ? 'No tasks available' : 'Start a game to see tasks'
          }}
        </div>
      </template>
      <template v-else>
        <ShopItem
          v-if="store.shopItems.length > 0"
          v-for="item in store.shopItems"
          :key="item.id"
          v-bind="item"
        />
        <div
          v-if="store.shopItems.length === 0"
          class="p-4 text-center text-amber-300"
        >
          {{
            isGameStarted
              ? 'No shop items available'
              : 'Start a game to see shop items'
          }}
        </div>
      </template>
    </div>
  </div>
</template>
