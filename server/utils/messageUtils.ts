import { EncryptionType } from '../../shared/types/mugloarApiTypes';

const decodeBase64Utf8 = (encoded: string): string =>
  Buffer.from(encoded, 'base64').toString('utf8');

const rot13 = (str: string): string => {
  return str.replace(/[a-zA-Z]/g, (c) => {
    let alphabetBaseIndex: number;
    if (c <= 'Z') {
      alphabetBaseIndex = 'A'.charCodeAt(0);
    } else {
      alphabetBaseIndex = 'a'.charCodeAt(0);
    }
    const indexInAlphabet = c.charCodeAt(0) - alphabetBaseIndex;
    return String.fromCharCode(
      alphabetBaseIndex + ((indexInAlphabet + 13) % 26),
    );
  });
};

export const processMessage = (message: Message): Message => {
  if (!message.encrypted) {
    return message;
  }

  if (message.encrypted === EncryptionType.BASE64) {
    return {
      ...message,
      adId: decodeBase64Utf8(message.adId),
      message: decodeBase64Utf8(message.message),
      probability: decodeBase64Utf8(message.probability),
    };
  }

  if (message.encrypted === EncryptionType.ROT13) {
    return {
      ...message,
      adId: rot13(message.adId),
      message: rot13(message.message),
      probability: rot13(message.probability),
    };
  }

  console.warn(
    'Unsupported message.encrypted value, using message as-is',
    message,
  );
  return message;
};
