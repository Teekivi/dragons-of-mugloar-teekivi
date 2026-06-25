<script setup lang="ts">
const { reward, expiresIn, probability, encrypted } = defineProps<{
  adId: string;
  message: string;
  reward: number;
  expiresIn: number;
  encrypted: number | null;
  probability: string;
  state?: ItemState;
}>();

const { solveMessage, isLoading, isGameManuallyPlayable } = useMugloar();

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

const sublabel = computed(() =>
  [
    `Reward: +${reward} gold`,
    `Expires in: ${expiresIn} turn${expiresIn > 1 ? 's' : ''}`,
    `Probability: ${probability}`,
    encrypted ? `Encrypted: ${getEncryptionLabel(encrypted)}` : '',
  ]
    .filter(Boolean)
    .join(', '),
);
</script>

<template>
  <BaseItem
    :label="message"
    :sublabel="sublabel"
    :buttonLabel="'Solve'"
    :buttonDisabled="isLoading || !isGameManuallyPlayable"
    :state="state"
    @buttonClick="solveMessage(adId)"
  />
</template>
