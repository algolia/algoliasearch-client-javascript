import { createWaitablePromise } from '../..';

const original = { foo: 'bar' };

const fooError = {
  message: 'Bar not found',
};

describe('awaitable promise', () => {
  it('resolves the original response without wait', async () => {
    const response = new Promise(resolve => resolve(original));
    const waitablePromise = createWaitablePromise(response);
    await expect(waitablePromise).resolves.toBe(original);
  });

  it('resolves the original response after wait', async () => {
    const response = new Promise(resolve => resolve(original));
    const waitablePromise = createWaitablePromise(response);
    await expect(waitablePromise.wait()).resolves.toBe(original);
  });

  it('gets the rejection of the original promise', async () => {
    const response = new Promise(() => {
      throw fooError;
    });
    const waitablePromise = createWaitablePromise(response);
    await expect(waitablePromise).rejects.toEqual({ message: 'Bar not found' });
  });

  it('gets the rejection of the wait promise', async () => {
    const response = new Promise(resolve => resolve(original));
    const waitablePromise = createWaitablePromise(response, () => {
      throw fooError;
    });
    await expect(waitablePromise.wait()).rejects.toEqual({ message: 'Bar not found' });
  });
});
