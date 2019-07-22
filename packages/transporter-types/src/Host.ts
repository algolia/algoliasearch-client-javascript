import { CallType } from './CallType';

export class Host {
  public readonly url: string;
  public readonly accept: CallType;

  private up: boolean = true;
  private downDate: number = 0;
  private static TTL = 3000;

  public constructor(options: { url: string; accept: CallType }) {
    this.url = options.url;
    this.accept = options.accept;
  }

  public setAsDown(): void {
    this.downDate = Date.now();
    this.up = false;
  }

  public isUp(): boolean {
    if (!this.up && Date.now() - this.downDate > Host.TTL) {
      this.up = true;
    }

    return this.up;
  }
}
