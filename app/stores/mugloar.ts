import type { WithState } from '~/types/mugloar';

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

    messages: [] as WithState<Message>[],
    shopItems: [] as WithState<ShopItem>[],

    isAutoplayActive: false,
  }),
});
