import { CallType } from './CallType';

export class Host {
  public readonly url: string;
  public readonly accept: CallType;

  public constructor(options: { url: string; accept: CallType }) {
    this.url = options.url;
    this.accept = options.accept;
  }
}
