import { WaitablePromise } from '..';

export function createMultiWaitable(
  responses: Array<Readonly<WaitablePromise<any>>>
): MultiWaitable {
  return {
    async wait() {
      for (let i = 0; i < responses.length; i++) {
        await responses[i].wait();
      }
    },
  };
}

export type MultiWaitable = {
  readonly wait: () => void;
};
