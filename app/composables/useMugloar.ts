export const useMugloar = () => {
  const mugloarStore = useMugloarStore();
  const { withHandling, isLoading } = useWithHandling();

  const startGame = withHandling(async () => {
    const data = await $fetch<StartGameResponse>('/api/game/start', {
      method: 'POST',
    });
    mugloarStore.$patch(data);
    await Promise.all([fetchMessages(), fetchShopItems()]);
    // The reputations are zero at the start of the game
    // so we don't need to use up a turn to investigate it
    mugloarStore.peopleReputation = 0;
    mugloarStore.stateReputation = 0;
    mugloarStore.underworldReputation = 0;
  });

  const investigateReputation = withHandling(async () => {
    const response = await $fetch<ReputationResponse>(
      `/api/${mugloarStore.gameId}/investigate/reputation`,
      {
        method: 'POST',
      },
    );
    mugloarStore.peopleReputation = response.people;
    mugloarStore.stateReputation = response.state;
    mugloarStore.underworldReputation = response.underworld;
    // optimistically increment the turn, as the endpoint doesn't return it
    mugloarStore.turn += 1;
    await fetchMessages();
  });

  const fetchMessages = withHandling(async () => {
    const response = await $fetch<Message[]>(
      `/api/${mugloarStore.gameId}/messages`,
      {
        method: 'GET',
      },
    );
    mugloarStore.messages = response;
  });

  const fetchShopItems = withHandling(async () => {
    const response = await $fetch<ShopItem[]>(
      `/api/${mugloarStore.gameId}/shop`,
      {
        method: 'GET',
      },
    );
    mugloarStore.shopItems = response;
  });

  const solveMessage = withHandling(async (adId: string) => {
    const response = await $fetch<MessageSolveResponse>(
      `/api/${mugloarStore.gameId}/solve/${adId}`,
      {
        method: 'POST',
      },
    );
    const message = mugloarStore.messages.find((msg) => msg.adId === adId);
    if (message) {
      message.state = response.success ? ItemState.SUCCESS : ItemState.FAILED;
    }
    mugloarStore.$patch(response);
    await fetchMessages();
  });

  const buyShopItem = withHandling(async (itemId: string) => {
    const response = await $fetch<ShopItemBuyResponse>(
      `/api/${mugloarStore.gameId}/shop/buy/${itemId}`,
      {
        method: 'POST',
      },
    );
    mugloarStore.$patch(response);
    await Promise.all([fetchMessages(), fetchShopItems()]);
    return response;
  });

  const isGameStarted = computed(() => !!mugloarStore.gameId);
  const isGameOver = computed(
    () => isGameStarted.value && mugloarStore.lives <= 0,
  );
  const isGameManuallyPlayable = computed(
    () => !isGameOver.value && !mugloarStore.isAutoplayActive,
  );

  return {
    startGame,
    investigateReputation,
    fetchMessages,
    fetchShopItems,
    solveMessage,
    buyShopItem,
    isGameStarted,
    isGameOver,
    isGameManuallyPlayable,
    isLoading,
  };
};
