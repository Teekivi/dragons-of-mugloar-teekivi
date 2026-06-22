export const useMugloar = () => {
  const store = useMugloarStore();
  const isLoading = ref(false);

  const withLoading =
    <TArgs extends unknown[]>(fn: (...args: TArgs) => Promise<void>) =>
    async (...args: TArgs) => {
      const wasAlreadyLoading = isLoading.value;
      isLoading.value = true;
      try {
        await fn(...args);
      } finally {
        if (!wasAlreadyLoading) {
          // Avoid issues on nested calls
          isLoading.value = false;
        }
      }
    };

  const fetchReputation = withLoading(async () => {
    const response = await $fetch<ReputationResponse>(
      `/api/${store.gameId}/investigate/reputation`,
      {
        method: 'POST',
      },
    );
    store.peopleReputation = response.people;
    store.stateReputation = response.state;
    store.underworldReputation = response.underworld;
  });

  const fetchMessages = withLoading(async () => {
    const response = await $fetch<Message[]>(`/api/${store.gameId}/messages`, {
      method: 'GET',
    });
    store.messages = response;
  });

  const fetchShopItems = withLoading(async () => {
    const response = await $fetch<ShopItem[]>(`/api/${store.gameId}/shop`, {
      method: 'GET',
    });
    store.shopItems = response;
  });

  const startGame = withLoading(async () => {
    const data = await $fetch<StartGameResponse>('/api/game/start', {
      method: 'POST',
    });
    store.$patch(data);
    await Promise.all([fetchReputation(), fetchMessages(), fetchShopItems()]);
  });

  const solveMessage = withLoading(async (adId: string) => {
    const response = await $fetch<MessageSolveResponse>(
      `/api/${store.gameId}/solve/${adId}`,
      {
        method: 'POST',
      },
    );
    store.$patch(response);
    await Promise.all([fetchMessages(), fetchReputation()]);
  });

  const buyShopItem = withLoading(async (itemId: string) => {
    const response = await $fetch<ShopItemBuyResponse>(
      `/api/${store.gameId}/shop/buy/${itemId}`,
      {
        method: 'POST',
      },
    );
    store.$patch(response);
    await Promise.all([fetchShopItems(), fetchReputation()]);
  });

  return {
    fetchReputation,
    fetchMessages,
    fetchShopItems,
    startGame,
    solveMessage,
    buyShopItem,
    isLoading,
  };
};
