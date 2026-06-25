export const useMugloarStore = defineStore('mugloarStore', {
  state: () => ({
    gameId: null as string | null,
    lives: 0,
    gold: 0,
    level: 0,
    score: 0,
    highScore: 0,
    turn: 0,

    peopleReputation: 0,
    stateReputation: 0,
    underworldReputation: 0,

    messages: [] as Message[],
    shopItems: [] as ShopItem[],

    isAutoplayActive: false,
  }),
});
