import { WaitablePromise } from '../WaitablePromise';

export function createMultiWaitable(responses: Array<WaitablePromise<any>>): MultiWaitable {
  return {
    wait: async () => {
      for (let i = 0; i < responses.length; i++) {
        await responses[i].wait();
      }
    },
  };
}

export type MultiWaitable = {
  readonly wait: () => void;
};
