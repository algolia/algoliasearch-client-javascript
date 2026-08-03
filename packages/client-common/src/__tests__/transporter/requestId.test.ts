import { afterEach, describe, expect, test, vi } from 'vitest';
import { generateRequestId, withRequestId } from '../../transporter';

describe('generateRequestId', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('matches the 11-char base62 format', () => {
    for (let i = 0; i < 1000; i++) {
      expect(generateRequestId()).toMatch(/^[0-9A-Za-z]{11}$/);
    }
  });

  test('generates distinct values across calls', () => {
    const ids = new Set(Array.from({ length: 10000 }, () => generateRequestId()));

    expect(ids.size).toBe(10000);
  });

  test('uses crypto.getRandomValues when available', () => {
    const getRandomValues = vi.fn((bytes: Uint8Array) => bytes.fill(0));
    vi.stubGlobal('crypto', { getRandomValues });

    expect(generateRequestId()).toBe('AAAAAAAAAAA');
    expect(getRandomValues).toHaveBeenCalledTimes(1);
  });

  test('falls back to Math.random when the crypto global is absent', () => {
    vi.stubGlobal('crypto', undefined);

    for (let i = 0; i < 1000; i++) {
      expect(generateRequestId()).toMatch(/^[0-9A-Za-z]{11}$/);
    }
  });

  test('generates distinct values without the crypto global', () => {
    vi.stubGlobal('crypto', undefined);

    const ids = new Set(Array.from({ length: 10000 }, () => generateRequestId()));

    expect(ids.size).toBe(10000);
  });
});

describe('withRequestId', () => {
  const transporter = (requestIdChannel?: 'headers' | 'queryParameters') => ({
    requestIdChannel,
    baseHeaders: {},
    baseQueryParameters: {},
  });

  test('returns the options unchanged when the channel is off', () => {
    const requestOptions = { headers: { 'x-custom': 'value' } };

    expect(withRequestId(transporter(undefined), requestOptions)).toBe(requestOptions);
    expect(withRequestId(transporter(undefined), undefined)).toBeUndefined();
  });

  test('adds a request-id header on the headers channel', () => {
    const requestOptions = withRequestId(transporter('headers'), { headers: { 'x-custom': 'value' } });

    expect(requestOptions?.headers).toMatchObject({
      'x-custom': 'value',
      'request-id': expect.stringMatching(/^[0-9A-Za-z]{11}$/),
    });
    expect(requestOptions?.queryParameters).toBeUndefined();
  });

  test('adds an x-algolia-request-id query parameter on the queryParameters channel', () => {
    const requestOptions = withRequestId(transporter('queryParameters'), undefined);

    expect(requestOptions?.queryParameters).toMatchObject({
      'x-algolia-request-id': expect.stringMatching(/^[0-9A-Za-z]{11}$/),
    });
    expect(requestOptions?.headers).toBeUndefined();
  });

  test('creates the options when none are given', () => {
    expect(withRequestId(transporter('headers'), undefined)?.headers?.['request-id']).toMatch(/^[0-9A-Za-z]{11}$/);
  });

  test('preserves the other request options', () => {
    const requestOptions = withRequestId(transporter('headers'), {
      timeouts: { read: 10 },
      queryParameters: { forwardToReplicas: 'true' },
      cacheable: false,
    });

    expect(requestOptions).toMatchObject({
      timeouts: { read: 10 },
      queryParameters: { forwardToReplicas: 'true' },
      cacheable: false,
    });
  });

  test('generates a distinct ID per call', () => {
    const first = withRequestId(transporter('headers'), undefined)?.headers?.['request-id'];
    const second = withRequestId(transporter('headers'), undefined)?.headers?.['request-id'];

    expect(first).not.toBe(second);
  });

  test('keeps a caller-supplied request-id header, case-insensitively', () => {
    const requestOptions = { headers: { 'Request-ID': 'CallerChose' } };

    expect(withRequestId(transporter('headers'), requestOptions)).toBe(requestOptions);
    expect(withRequestId(transporter('queryParameters'), requestOptions)).toBe(requestOptions);
  });

  test('keeps a caller-supplied x-algolia-request-id query parameter', () => {
    const requestOptions = { queryParameters: { 'x-algolia-request-id': 'CallerChose' } };

    expect(withRequestId(transporter('headers'), requestOptions)).toBe(requestOptions);
    expect(withRequestId(transporter('queryParameters'), requestOptions)).toBe(requestOptions);
  });

  test('is a no-op on its own output, so nested helpers share one ID', () => {
    const requestOptions = withRequestId(transporter('headers'), undefined);

    expect(withRequestId(transporter('headers'), requestOptions)).toBe(requestOptions);
  });

  test('respects a request-id set in the transporter base headers', () => {
    const requestOptions = withRequestId(
      { requestIdChannel: 'headers', baseHeaders: { 'Request-ID': 'BaseChose' }, baseQueryParameters: {} },
      undefined,
    );

    expect(requestOptions).toBeUndefined();
  });

  test('respects an x-algolia-request-id set in the transporter base query parameters', () => {
    const requestOptions = withRequestId(
      {
        requestIdChannel: 'queryParameters',
        baseHeaders: {},
        baseQueryParameters: { 'x-algolia-request-id': 'BaseChose' },
      },
      undefined,
    );

    expect(requestOptions).toBeUndefined();
  });
});
