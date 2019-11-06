import { CallType } from '.';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createHost(url: string, accept: CallType) {
  const ttl = 3000;

  return {
    url,
    accept,
    downDate: 0,
    up: true,
    setAsDown(): void {
      // eslint-disable-next-line functional/immutable-data
      this.downDate = Date.now();
      // eslint-disable-next-line functional/immutable-data
      this.up = false;
    },

    isUp(): boolean {
      if (!this.up && Date.now() - this.downDate > ttl) {
        // eslint-disable-next-line functional/immutable-data
        this.up = true;
      }

      return this.up;
    },
  };
}
