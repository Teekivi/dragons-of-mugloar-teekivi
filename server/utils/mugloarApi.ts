export const startGame = async () => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  return $fetch<StartGameResponse>(`${mugloarBaseUrl}/game/start`, {
    method: 'POST',
  });
};

export const investigateReputation = async (gameId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  return $fetch<ReputationResponse>(
    `${mugloarBaseUrl}/${gameId}/investigate/reputation`,
    {
      method: 'POST',
    },
  );
};

export const getMessages = async (gameId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  const response = await $fetch<Message[]>(
    `${mugloarBaseUrl}/${gameId}/messages`,
    {
      method: 'GET',
    },
  );
  return response;
};

export const solveMessage = async (gameId: string, adId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  return $fetch<MessageSolveResponse>(
    `${mugloarBaseUrl}/${gameId}/solve/${adId}`,
    {
      method: 'POST',
    },
  );
};

export const getShopItems = async (gameId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  const response = await $fetch<ShopItem[]>(
    `${mugloarBaseUrl}/${gameId}/shop`,
    {
      method: 'GET',
    },
  );
  return response;
};

export const buyShopItem = async (gameId: string, itemId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  return $fetch<ShopItemBuyResponse>(
    `${mugloarBaseUrl}/${gameId}/shop/buy/${itemId}`,
    {
      method: 'POST',
    },
  );
};
