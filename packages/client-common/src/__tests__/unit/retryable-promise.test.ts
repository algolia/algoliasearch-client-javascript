import { createRetryablePromise } from '../..';

const fooError = {
  message: 'Bar not found',
};

describe('retryable promise', () => {
  it('resolves promise after some retries', async () => {
    let calls = 0;

    const response = await createRetryablePromise(retry => {
      calls++;

      if (calls < 3) {
        return retry();
      }

      return Promise.resolve();
    });
    expect(calls).toBe(3);
    expect(response).toBe(undefined);
  });

  it('gets the rejection of the given promise from the callback', async () => {
    let calls = 0;

    const promise = createRetryablePromise(retry => {
      return new Promise<any>(resolve => {
        calls++;

        if (calls > 2) {
          throw fooError;
        }

        resolve(retry());
      });
    });

    await expect(promise).rejects.toEqual({ message: 'Bar not found' });
  });
});
