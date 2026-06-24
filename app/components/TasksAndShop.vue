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

const noTasksMessage = computed(() => {
  if (store.messages.length) {
    return null;
  }
  if (!isGameStarted.value) {
    return 'Start a game to see tasks';
  }
  return 'No tasks available';
});

const noShopItemsMessage = computed(() => {
  if (store.shopItems.length) {
    return null;
  }
  if (!isGameStarted.value) {
    return 'Start a game to see shop items';
  }
  return 'No shop items available';
});
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
      <GameSection
        class="flex-[2]"
        title="Tasks"
        :isActiveTab="activeTab === 'tasks'"
        :isLoading="isLoadingMessages"
        :noItemsMessage="noTasksMessage"
        @refresh="fetchMessages"
      >
        <Task v-for="task in store.messages" :key="task.adId" v-bind="task" />
      </GameSection>
      <GameSection
        class="flex-1"
        title="Shop"
        :isActiveTab="activeTab === 'shop'"
        :isLoading="isLoadingShopItems"
        :noItemsMessage="noShopItemsMessage"
        @refresh="fetchShopItems"
      >
        <ShopItem
          v-for="item in store.shopItems"
          :key="item.id"
          v-bind="item"
        />
      </GameSection>
    </div>
  </div>
</template>
