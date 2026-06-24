<script setup lang="ts">
defineProps<{
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  encrypted: number | null;
  probability: string;
}>();

const { solveMessage, isLoading } = useMugloar();

const getEncryptionLabel = (
  encrypted: EncryptionType | number | null,
): string => {
  if (!encrypted) {
    return '';
  }
  const encryptedToLabel: Record<EncryptionType, string> = {
    [EncryptionType.ROT13]: 'ROT13',
    [EncryptionType.BASE64]: 'Base64',
  };
  const label = encryptedToLabel[encrypted as EncryptionType];
  return `${label ?? 'Unsupported'} (${encrypted})`;
};
</script>

<template>
  <div class="flex p-2 odd:bg-amber-900">
    <div class="flex-1">
      <div class="text-sm text-amber-300">{{ message }}</div>
      <div class="text-xs text-white">
        Reward: +{{ reward }} gold, Expires in: {{ expiresIn }} turn{{
          expiresIn > 1 ? 's' : ''
        }}, Probability:
        {{ probability }}
        <span v-if="encrypted" class="text-amber-500">
          (encrypted: {{ getEncryptionLabel(encrypted) }})
        </span>
      </div>
    </div>
    <Button :disabled="isLoading" @click="solveMessage(adId)">Solve</Button>
  </div>
</template>
