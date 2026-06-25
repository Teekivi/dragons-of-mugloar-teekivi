import { describe, it, expect } from 'vitest';
import { pickMessageToSolve } from '~/server/utils/autoplay';
import { Message } from '~/shared/types/mugloarApiTypes';

describe('pickMessageToSolve', () => {
  it('should return null if there are no messages', () => {
    const messages: Message[] = [];
    const result = pickMessageToSolve(messages);
    expect(result).toBeNull();
  });

  it('should return the message with the highest probability rank', () => {
    const messages: Message[] = [
      {
        adId: '1',
        message: 'Message 1',
        reward: 20,
        expiresIn: 5,
        encrypted: null,
        probability: 'Hmmm....',
      },
      {
        adId: '2',
        message: 'Message 2',
        reward: 10,
        expiresIn: 3,
        encrypted: null,
        probability: 'Sure thing',
      },
      {
        adId: '3',
        message: 'Message 3',
        reward: 30,
        expiresIn: 4,
        encrypted: null,
        probability: 'Risky',
      },
    ];

    const result = pickMessageToSolve(messages);
    expect(result).toEqual(messages[1]);
  });

  it('should return the message with the highest reward if there are multiple most probable ones', () => {
    const messages: Message[] = [
      {
        adId: '1',
        message: 'Message 1',
        reward: 10,
        expiresIn: 5,
        encrypted: null,
        probability: 'Piece of cake',
      },
      {
        adId: '2',
        message: 'Message 2',
        reward: 30,
        expiresIn: 3,
        encrypted: null,
        probability: 'Sure thing',
      },
      {
        adId: '3',
        message: 'Message 2',
        reward: 20,
        expiresIn: 3,
        encrypted: null,
        probability: 'Piece of cake',
      },
      {
        adId: '4',
        message: 'Message 4',
        reward: 17,
        expiresIn: 4,
        encrypted: null,
        probability: 'Walk in the park',
      },
    ];

    const result = pickMessageToSolve(messages);
    expect(result).toEqual(messages[2]);
  });
});
