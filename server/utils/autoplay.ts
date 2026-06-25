import type { Peer } from 'crossws';

const gameIdToPeer = new Map<string, Peer>();
const activeGameIds = new Set<string>();

export const getGameIdFromAutoplayUrl = (url: string): string | null => {
  const gameId = url.match(/\/api\/([^/]+)\/autoplay/)?.[1];
  return gameId || null;
};

export const registerAutoplayPeer = (gameId: string, peer: Peer) => {
  gameIdToPeer.set(gameId, peer);
};

export const unregisterAutoplayPeer = (gameId: string) => {
  gameIdToPeer.delete(gameId);
  activeGameIds.delete(gameId);
};

export const startAutoplay = async (
  gameId: string,
  state: AutoplayInputState,
) => {
  if (activeGameIds.has(gameId)) {
    throw new Error(`Autoplay is already active for game ${gameId}`);
  }
  activeGameIds.add(gameId);
  executeAutoplay(gameId, state).catch((err) => {
    console.error(`Error during autoplay for game ${gameId}:`, err);
  });
};

export const stopAutoplay = async (gameId: string) => {
  activeGameIds.delete(gameId);
};

const executeAutoplay = async (
  gameId: string,
  initialState: AutoplayInputState,
) => {
  const state = { ...initialState };

  const peer = gameIdToPeer.get(gameId);
  if (!peer) {
    console.warn(`No WebSocket peer found for game ${gameId}`);
    return;
  }

  peer.send(
    JSON.stringify({
      type: 'stateUpdate',
      data: { isAutoplayActive: true },
    }),
  );

  while (activeGameIds.has(gameId) && state.lives > 0) {
    if (state.lives < 3) {
      const shopItems = await getShopItems(gameId);
      const healingPotion = shopItems.find(
        (item) => item.id === ShopItemId.HEALING_POTION,
      );
      if (healingPotion && state.gold >= healingPotion.cost) {
        const buyResponse = await buyShopItem(gameId, healingPotion.id);
        peer.send(JSON.stringify({ type: 'stateUpdate', data: buyResponse }));
        Object.assign(state, buyResponse);
        await sleep(1000);
      }
    }
    const messages = await getMessages(gameId);
    peer.send(JSON.stringify({ type: 'stateUpdate', data: { messages } }));
    const message = pickMessageToSolve(messages);
    if (!message) {
      console.log(`No message to solve for game ${gameId}`);
      break;
    }
    const solveResponse = await solveMessage(gameId, message.adId);
    peer.send(JSON.stringify({ type: 'stateUpdate', data: solveResponse }));
    Object.assign(state, solveResponse);
    await sleep(1000);
  }

  if (peer) {
    peer.send(
      JSON.stringify({
        type: 'stateUpdate',
        data: { isAutoplayActive: false },
      }),
    );
  }
};

const pickMessageToSolve = (messages: Message[]): Message | null => {
  if (!messages.length) {
    return null;
  }
  return messages.reduce((currentBest, message) => {
    const currentBestRank = getProbabilityRank(currentBest.probability);
    const messageRank = getProbabilityRank(message.probability);
    if (messageRank < currentBestRank) {
      return message;
    }
    if (message.reward > currentBest.reward) {
      return message;
    }
    return currentBest;
  });
};

const probabilityOrder = [
  'Piece of cake',
  'Sure thing',
  'Walk in the park',
  'Quite likely',
  'Hmmm....',
  'Gamble',
  'Rather detrimental',
  'Playing with fire',
  'Suicide mission',
  'Impossible',
];

const getProbabilityRank = (probability: string): number => {
  const index = probabilityOrder.indexOf(probability);
  if (index === -1) {
    // TODO: remove once we have more full probabilityOrder listing
    console.warn(`Unknown probability: ${probability}`);
  }
  return index !== -1 ? index : probabilityOrder.length;
};
