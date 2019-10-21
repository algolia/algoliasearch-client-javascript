import { CallType } from '@algolia/transporter/src/Call';

export class Host {
  // eslint-disable-next-line functional/prefer-readonly-type
  public up: boolean = true;

  // eslint-disable-next-line functional/prefer-readonly-type
  public downDate: number = 0;

  public readonly url: string;

  public readonly accept: CallType;

  private static readonly TTL = 3000;

  public constructor(options: { readonly url: string; readonly accept: CallType }) {
    this.url = options.url;
    this.accept = options.accept;
  }

  public setAsDown(): void {
    // eslint-disable-next-line functional/immutable-data
    this.downDate = Date.now();
    // eslint-disable-next-line functional/immutable-data
    this.up = false;
  }

  public isUp(): boolean {
    if (!this.up && Date.now() - this.downDate > Host.TTL) {
      // eslint-disable-next-line functional/immutable-data
      this.up = true;
    }

    return this.up;
  }
}
