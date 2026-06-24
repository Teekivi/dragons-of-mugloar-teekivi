export interface StartGameResponse {
  gameId: string; // Unique game ID for the new game started.
  lives: number; // How many lives player starts with
  gold: number; // Gold player starts with,
  level: number; // The initial dragon level
  score: number; // The initial game score
  highScore: number; // The current highest score
  turn: number; // The turn number
}

export interface ReputationResponse {
  people: number; // Your reputation with people
  state: number; // Your reputation with state
  underworld: number; // Your reputation with underworld
}

export interface Message {
  adId: string; // The unique ID of the message
  message: string; // Free text description of the message
  reward: number; // Reward in gold which is granted for successfully solving the game.
  expiresIn: number; // The amount in turns in which the message will become unavailable for solving.
  encrypted: number | null; // 1 if "encrypted" in base64
  probability: string; // Chance of success, otherwise the player loses one life (undocumented)
}

export interface MessageSolveResponse {
  success: boolean; // Whether the attempt to solve the message was successful.
  lives: number; // Amount of lives left after the attempt
  gold: number; // Amount of gold after the attempt
  score: number; // Score after the attempt
  highScore: number; // The current highest score
  turn: number; // Current turn number
  message: string; // Text explanation of what happened on the last turn.
}

export interface ShopItem {
  id: string; // Item unique identifier
  name: string; // Item name
  cost: number; // Item cost in gold
}

export interface ShopItemBuyResponse {
  shoppingSuccess: boolean; // Whether or not the purchase was successful
  gold: number; // Amount of gold left after the transaction.
  lives: number; // Amount of lives left after the transaction
  level: number; // Dragon level after transaction
  turn: number; // Current turn. Note the turn increases even if the purchase is unsuccessful.
}
