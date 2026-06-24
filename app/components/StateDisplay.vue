<script setup lang="ts">
const store = useMugloarStore();

const valueIfGameStarted = <T,>(value: T) => (store.gameId ? value : null);

const { investigateReputation, isLoading } = useMugloar();
</script>

<template>
  <div class="flex flex-wrap gap-x-6 gap-y-4">
    <div>
      <h2 class="mb-2 text-lg text-amber-300">Stats:</h2>
      <div class="flex flex-wrap gap-2">
        <StateElement label="Lives" :value="valueIfGameStarted(store.lives)" />
        <StateElement label="Gold" :value="valueIfGameStarted(store.gold)" />
        <StateElement label="Level" :value="valueIfGameStarted(store.level)" />
        <StateElement label="Score" :value="valueIfGameStarted(store.score)" />
        <StateElement
          label="HiScore"
          :value="valueIfGameStarted(store.highScore)"
        />
        <StateElement label="Turn" :value="valueIfGameStarted(store.turn)" />
      </div>
    </div>
    <div>
      <h2 class="mb-2 flex items-center gap-2 text-lg text-amber-300">
        Reputation:
        <Button small :disabled="isLoading" @click="investigateReputation"
          >Investigate</Button
        >
      </h2>
      <div class="flex flex-wrap gap-2">
        <StateElement
          label="People"
          :value="valueIfGameStarted(store.peopleReputation)"
        />
        <StateElement
          label="State"
          :value="valueIfGameStarted(store.stateReputation)"
        />
        <StateElement
          label="Underworld"
          :value="valueIfGameStarted(store.underworldReputation)"
        />
      </div>
    </div>
  </div>
</template>
