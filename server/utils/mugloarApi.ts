const handleUpstreamError = (error: unknown): never => {
  if (error && typeof error === 'object' && 'response' in error) {
    const status = (error as any).response?.status;
    const statusMessage =
      (error as any).response?.statusText ?? 'Upstream error';
    throw createError({ statusCode: status, statusMessage });
  }
  throw error;
};

export const startGame = async () => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  return $fetch<StartGameResponse>(`${mugloarBaseUrl}/game/start`, {
    method: 'POST',
  }).catch(handleUpstreamError);
};

export const investigateReputation = async (gameId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  return $fetch<ReputationResponse>(
    `${mugloarBaseUrl}/${gameId}/investigate/reputation`,
    {
      method: 'POST',
    },
  ).catch(handleUpstreamError);
};

export const getMessages = async (gameId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  const messages = await $fetch<Message[]>(
    `${mugloarBaseUrl}/${gameId}/messages`,
    {
      method: 'GET',
    },
  ).catch(handleUpstreamError);
  return messages.map(processMessage);
};

export const solveMessage = async (gameId: string, adId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  return $fetch<MessageSolveResponse>(
    `${mugloarBaseUrl}/${gameId}/solve/${adId}`,
    {
      method: 'POST',
    },
  ).catch(handleUpstreamError);
};

export const getShopItems = async (gameId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  return $fetch<ShopItem[]>(`${mugloarBaseUrl}/${gameId}/shop`, {
    method: 'GET',
  }).catch(handleUpstreamError);
};

export const buyShopItem = async (gameId: string, itemId: string) => {
  const { mugloarBaseUrl } = useRuntimeConfig();
  return $fetch<ShopItemBuyResponse>(
    `${mugloarBaseUrl}/${gameId}/shop/buy/${itemId}`,
    {
      method: 'POST',
    },
  ).catch(handleUpstreamError);
};
