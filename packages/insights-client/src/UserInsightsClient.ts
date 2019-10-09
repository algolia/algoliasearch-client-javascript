import { HasSendEvent } from './methods/client/sendEvent';

export class UserInsightsClient {
  public readonly client: HasSendEvent;

  public readonly userToken: string;

  public constructor(client: HasSendEvent, userToken: string) {
    this.client = client;
    this.userToken = userToken;
  }
}
