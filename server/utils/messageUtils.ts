const decodeBase64Utf8 = (encoded: string): string =>
  Buffer.from(encoded, 'base64').toString('utf8');

export const processMessage = (message: Message): Message => {
  if (!message.encrypted) {
    return message;
  }

  if (message.encrypted === 1) {
    return {
      ...message,
      adId: decodeBase64Utf8(message.adId),
      message: decodeBase64Utf8(message.message),
      probability: decodeBase64Utf8(message.probability),
    };
  }

  console.warn(
    'Unsupported message.encrypted value, using message as-is',
    message,
  );
  return message;
};
