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

  const encryptionToDecryptFunc: Record<
    EncryptionType,
    (str: string) => string
  > = {
    [EncryptionType.BASE64]: decodeBase64Utf8,
    [EncryptionType.ROT13]: rot13,
  };

  const decrypt = encryptionToDecryptFunc[message.encrypted as EncryptionType];

  if (decrypt) {
    return {
      ...message,
      adId: decrypt(message.adId),
      message: decrypt(message.message),
      probability: decrypt(message.probability),
    };
  }

  console.warn(
    'Unsupported message.encrypted value, using message as-is',
    message,
  );
  return message;
};
