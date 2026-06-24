export const processMessage = (message: Message): Message => {
  if (!message.encrypted) {
    return message;
  }

  if (message.encrypted === 1) {
    return {
      ...message,
      adId: atob(message.adId),
      message: atob(message.message),
      probability: atob(message.probability),
    };
  }

  console.warn(
    'Unsupported message.encrypted value, using message as-is',
    message,
  );
  return message;
};
