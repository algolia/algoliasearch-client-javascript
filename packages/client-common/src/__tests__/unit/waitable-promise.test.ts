import { createWaitablePromise } from '../..';

const original = { foo: 'bar' };

class FooError {
  public readonly message = 'Bar not found';
}

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
      throw new FooError();
    });
    const waitablePromise = createWaitablePromise(response);
    await expect(waitablePromise).rejects.toEqual({ message: 'Bar not found' });
  });

  it('gets the rejection of the wait promise', async () => {
    const response = new Promise(resolve => resolve(original));
    const waitablePromise = createWaitablePromise(response);
    waitablePromise.onWait(() => {
      throw new FooError();
    });
    await expect(waitablePromise.wait()).rejects.toEqual({ message: 'Bar not found' });
  });
});
