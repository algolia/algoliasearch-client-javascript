import { HasSendEvent } from './methods/client/sendEvent';

export class UserInsightsClient {
  public readonly client: HasSendEvent;

  public readonly userToken: string;

  public constructor(client: HasSendEvent, userToken: string) {
    this.client = client;
    this.userToken = userToken;
  }
}

export type UserInsightsClientOptions = {
  readonly eventName: string;
  readonly indexName: string;
  readonly objectIDs?: readonly string[];
  readonly positions?: readonly number[];
  readonly filters?: readonly string[];
  readonly queryID?: string;
};
