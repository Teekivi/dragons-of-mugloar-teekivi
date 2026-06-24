import { describe, it, expect } from 'vitest';
import { processMessage } from '~/server/utils/messageUtils';
import type { Message } from '~/shared/types/mugloarApiTypes';

describe('processMessage', () => {
  it('should return the message as-is if not encrypted', () => {
    const message: Message = {
      adId: 'VfRTU1rX',
      message:
        'Help Devika Webster to transport a magic cat to plains in Bleakpool',
      reward: 10,
      expiresIn: 7,
      encrypted: null,
      probability: 'Hmmm....',
    };

    const result = processMessage({ ...message });
    expect(result).toEqual(message);
  });

  it('should decode base64 encoded message if encrypted is 1', () => {
    const message: Message = {
      adId: 'N1F0YnNNRkk=',
      message:
        'SW52ZXN0aWdhdGUgRWxpdGEgSHVkZGxlc3RvbiBhbmQgZmluZCBvdXQgdGhlaXIgcmVsYXRpb24gdG8gdGhlIG1hZ2ljIHBvdGF0b2VzLg==',
      reward: 140,
      expiresIn: 3,
      encrypted: 1,
      probability: 'UGxheWluZyB3aXRoIGZpcmU=',
    };

    const expected: Message = {
      adId: '7QtbsMFI',
      message:
        'Investigate Elita Huddleston and find out their relation to the magic potatoes.',
      reward: 140,
      expiresIn: 3,
      encrypted: 1,
      probability: 'Playing with fire',
    };

    const result = processMessage({ ...message });
    expect(result).toEqual(expected);
  });

  it('should use UTF-8 encoding when decoding base64 multi-byte characters', () => {
    const message: Message = {
      adId: 'WDdrUjJtTnA=',
      message:
        'SGVscCDDhXNhIExpbmRzdHLDtm0gdG8gdHJhbnNwb3J0IGEgbWFnaWMgY2F0IHRvIHBsYWlucyBpbiBCbGVha3Bvb2w=',
      reward: 75,
      expiresIn: 4,
      encrypted: 1,
      probability: 'R2FtYmxl',
    };

    const expected: Message = {
      adId: 'X7kR2mNp',
      message:
        'Help Åsa Lindström to transport a magic cat to plains in Bleakpool',
      reward: 75,
      expiresIn: 4,
      encrypted: 1,
      probability: 'Gamble',
    };

    const result = processMessage({ ...message });
    expect(result).toEqual(expected);
  });
});
