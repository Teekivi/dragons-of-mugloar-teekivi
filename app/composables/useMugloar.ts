export const useMugloar = () => {
  const mugloarStore = useMugloarStore();
  const toastsStore = useToastsStore();
  const isLoading = ref(false);

  const withHandling =
    <TArgs extends unknown[], TResult>(
      fn: (...args: TArgs) => Promise<TResult>,
    ) =>
    async (...args: TArgs) => {
      const wasAlreadyLoading = isLoading.value;
      isLoading.value = true;
      try {
        return await fn(...args);
      } catch (error: any) {
        const statusCode = error.data?.statusCode;
        if (statusCode === 404) {
          toastsStore.addToastWithMessage(
            'Looks like the game might have expired. Please start a new game.',
          );
        } else if (statusCode !== 410) {
          // HTTP 410 corresponds to game over in which case we don't want to show a toast
          toastsStore.addToastWithMessage(
            'Something went wrong. Please try again later.',
          );
        }
        throw error;
      } finally {
        if (!wasAlreadyLoading) {
          // Avoid issues on nested calls
          isLoading.value = false;
        }
      }
    };

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

  return {
    startGame,
    investigateReputation,
    fetchMessages,
    fetchShopItems,
    solveMessage,
    buyShopItem,
    isGameStarted,
    isGameOver,
    isLoading,
  };
};
