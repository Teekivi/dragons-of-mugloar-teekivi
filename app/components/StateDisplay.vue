<template>
  <div class="flex flex-wrap gap-x-6 gap-y-4">
    <div>
      <h2 class="mb-2 text-lg text-amber-300">Stats:</h2>
      <div class="flex flex-wrap gap-2">
        <StateElement label="Lives" :value="3" />
        <StateElement label="Gold" :value="0" />
        <StateElement label="Level" :value="0" />
        <StateElement label="Score" :value="0" />
        <StateElement label="HiScore" :value="0" />
        <StateElement label="Turn" :value="0" />
      </div>
    </div>
    <div>
      <h2 class="mb-2 flex items-center gap-2 text-lg text-amber-300">
        Reputation: <Button small>Investigate</Button>
      </h2>
      <div class="flex flex-wrap gap-2">
        <StateElement label="People" :value="3" />
        <StateElement label="State" :value="0" />
        <StateElement label="Underworld" :value="0" />
      </div>
    </div>
  </div>
</template>
