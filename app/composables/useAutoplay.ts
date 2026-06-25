let autoplayWs: WebSocket | null = null;

export const useAutoplay = () => {
  const mugloarStore = useMugloarStore();
  const { withHandling, isLoading } = useWithHandling();

  const connectWs = (gameId: string): Promise<void> =>
    new Promise((resolve, reject) => {
      if (autoplayWs) {
        autoplayWs.close();
      }
      if (!import.meta.client) {
        resolve();
        return;
      }
      const { protocol, host } = window.location;
      const wsProtocol = protocol === 'https:' ? 'wss:' : 'ws:';
      autoplayWs = new WebSocket(
        `${wsProtocol}//${host}/api/${gameId}/autoplay/ws`,
      );
      autoplayWs.onopen = () => resolve();
      autoplayWs.onerror = (err) => reject(err);
      autoplayWs.onmessage = (event) => {
        const parsed = JSON.parse(event.data);
        if (parsed.type === 'stateUpdate') {
          mugloarStore.$patch(parsed.data);
        } else if (parsed.type === 'messageStateUpdate') {
          const { adId, state } = parsed.data;
          const message = mugloarStore.messages.find(
            (msg) => msg.adId === adId,
          );
          if (message) {
            message.state = state;
          }
        } else if (parsed.type === 'shopItemStateUpdate') {
          const { id, state } = parsed.data;
          const shopItem = mugloarStore.shopItems.find(
            (item) => item.id === id,
          );
          if (shopItem) {
            shopItem.state = state;
          }
        }
      };
      autoplayWs.onclose = () => {
        autoplayWs = null;
        mugloarStore.isAutoplayActive = false;
      };
    });

  const startAutoplay = withHandling(async () => {
    await connectWs(mugloarStore.gameId!);
    await $fetch(`/api/${mugloarStore.gameId}/autoplay/start`, {
      method: 'PUT',
      body: mugloarStore.$state,
    });
  });

  const stopAutoplay = withHandling(async (gameIdOverride?: string) => {
    await $fetch(
      `/api/${gameIdOverride ?? mugloarStore.gameId}/autoplay/stop`,
      {
        method: 'PUT',
      },
    );
    if (autoplayWs) {
      autoplayWs.close();
      autoplayWs = null;
    }
  });

  watch(
    () => mugloarStore.gameId,
    (newGameId, oldGameId) => {
      if (oldGameId && autoplayWs) {
        stopAutoplay(oldGameId);
      }
    },
  );

  return {
    startAutoplay,
    stopAutoplay,
    isAutoplayActive: computed(() => mugloarStore.isAutoplayActive),
    isLoading,
  };
};
