<script setup lang="ts">
const activeTab = ref<'tasks' | 'shop'>('tasks');

const store = useMugloarStore();

const { isGameStarted, isGameOver } = useMugloar();

// Use useMugloar multiple times for independent loading states
const { fetchMessages, isLoading: isLoadingMessages } = useMugloar();
const { fetchShopItems, isLoading: isLoadingShopItems } = useMugloar();

const refreshBasedOnActiveTab = () => {
  if (activeTab.value === 'tasks') {
    fetchMessages();
  } else {
    fetchShopItems();
  }
};
</script>

<template>
  <div class="flex flex-col self-stretch">
    <div class="flex lg:hidden">
      <Tab :active="activeTab === 'tasks'" @click="activeTab = 'tasks'">
        Tasks
      </Tab>
      <Tab :active="activeTab === 'shop'" @click="activeTab = 'shop'">Shop</Tab>
      <div class="flex-1" />
      <div class="my-1 ml-1 mr-2">
        <Button
          small
          :disabled="
            !isGameStarted ||
            isLoadingMessages ||
            isLoadingShopItems ||
            isGameOver
          "
          @click="refreshBasedOnActiveTab"
        >
          Refresh
        </Button>
      </div>
    </div>

    <div class="flex gap-4 self-stretch">
      <div :class="['flex-[2] lg:block', { hidden: activeTab !== 'tasks' }]">
        <div class="mb-2 hidden items-center justify-between lg:flex">
          <div class="font-cinzel text-lg text-amber-300">Tasks:</div>
          <div class="my-1 ml-1 mr-2">
            <Button
              small
              :disabled="!isGameStarted || isLoadingMessages || isGameOver"
              @click="fetchMessages"
            >
              Refresh
            </Button>
          </div>
        </div>
        <div class="rounded-b-lg bg-amber-800 p-2">
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
        </div>
      </div>

      <div :class="['flex-1 lg:block', { hidden: activeTab !== 'shop' }]">
        <div class="mb-2 hidden items-center justify-between lg:flex">
          <div class="font-cinzel text-lg text-amber-300">Shop:</div>
          <div class="my-1 ml-1 mr-2">
            <Button
              small
              :disabled="!isGameStarted || isLoadingShopItems || isGameOver"
              @click="fetchShopItems"
            >
              Refresh
            </Button>
          </div>
        </div>
        <div class="rounded-b-lg bg-amber-800 p-2">
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
        </div>
      </div>
    </div>
  </div>
</template>
