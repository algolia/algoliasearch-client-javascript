import { createHmac } from 'node:crypto';

import { expect, test } from 'vitest';

import { agentStudioClient } from '../builds/node';

test('forgeSecuredUserToken with default expiry', () => {
  const client = agentStudioClient('APP_ID', 'API_KEY');

  const token = client.forgeSecuredUserToken({
    secretKey: 'my-secret-key',
    secretKeyId: 'my-key-id',
    userId: 'user-123',
  });

  const parts = token.split('.');
  expect(parts).toHaveLength(3);

  const header = JSON.parse(Buffer.from(parts[0], 'base64url').toString());
  expect(header.alg).toBe('HS256');
  expect(header.typ).toBe('JWT');
  expect(header.kid).toBe('my-key-id');

  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
  expect(payload.sub).toBe('user-123');
  const expectedExp = Math.floor(Date.now() / 1000) + 24 * 3600;
  expect(Math.abs(payload.exp - expectedExp)).toBeLessThan(5);

  const expectedSig = createHmac('sha256', 'my-secret-key').update(`${parts[0]}.${parts[1]}`).digest('base64url');
  expect(parts[2]).toBe(expectedSig);
});

test('forgeSecuredUserToken with custom expiry', () => {
  const client = agentStudioClient('APP_ID', 'API_KEY');

  const token = client.forgeSecuredUserToken({
    secretKey: 'my-secret-key',
    secretKeyId: 'my-key-id',
    userId: 'user-456',
    expiresIn: 3600,
  });

  const parts = token.split('.');
  const payload = JSON.parse(Buffer.from(parts[1], 'base64url').toString());
  const expectedExp = Math.floor(Date.now() / 1000) + 3600;
  expect(Math.abs(payload.exp - expectedExp)).toBeLessThan(5);
});
