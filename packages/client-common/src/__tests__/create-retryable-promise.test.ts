import { createRetryablePromise } from '../createRetryablePromise';

describe('createRetryablePromise', () => {
  it('resolves promise after some retries', async () => {
    let calls = 0;
    const promise = createRetryablePromise({
      func: () => {
        return new Promise((resolve) => {
          calls += 1;
          resolve(`success #${calls}`);
        });
      },
      validate: () => calls >= 3,
    });

    await expect(promise).resolves.toEqual('success #3');
    expect(calls).toBe(3);
  });

  it('gets the rejection of the given promise via reject', async () => {
    let calls = 0;

    const promise = createRetryablePromise({
      func: () => {
        return new Promise((resolve, reject) => {
          calls += 1;
          if (calls <= 3) {
            resolve('okay');
          } else {
            reject(new Error('nope'));
          }
        });
      },
      validate: () => false,
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({ message: 'nope' })
    );
  });

  it('gets the rejection of the given promise via throw', async () => {
    let calls = 0;

    const promise = createRetryablePromise({
      func: () => {
        return new Promise((resolve) => {
          calls += 1;
          if (calls <= 3) {
            resolve('okay');
          } else {
            throw new Error('nope');
          }
        });
      },
      validate: () => false,
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({ message: 'nope' })
    );
  });

  it('gets the rejection when it exceeds the max retries number', async () => {
    const MAX_RETRIES = 3;
    let calls = 0;

    const promise = createRetryablePromise({
      func: () => {
        return new Promise((resolve) => {
          calls += 1;
          resolve('okay');
        });
      },
      validate: () => false,
      maxRetries: MAX_RETRIES,
    });

    await expect(promise).rejects.toEqual(
      expect.objectContaining({
        message: 'The maximum number of retries exceeded. (3/3)',
      })
    );
    expect(calls).toBe(MAX_RETRIES);
  });
});
