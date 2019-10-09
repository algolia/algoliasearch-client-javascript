import { RequestOptions } from '@algolia/transporter-types';
import { UserInsightsClient, UserInsightsClientOptions } from '../../UserInsightsClient';
import { EventEnum } from '../types/EventType';
import { ConstructorOf } from '@algolia/support';
import { SendEventResponse } from '../types/SendEventResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const viewedObjectIDs = <TUserInsightsClient extends ConstructorOf<UserInsightsClient>>(
  base: TUserInsightsClient
) => {
  return class extends base implements HasViewedObjectIDs {
    public viewedObjectIDs(
      options: UserInsightsClientOptions,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SendEventResponse>> {
      return this.client.sendEvent(
        {
          eventType: EventEnum.Click,
          eventName: options.eventName,
          index: options.indexName,
          userToken: this.userToken,
          objectIDs: options.objectIDs,
        },
        requestOptions
      );
    }
  };
};

export type HasViewedObjectIDs = UserInsightsClient & {
  readonly viewedObjectIDs: (
    options: UserInsightsClientOptions,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SendEventResponse>>;
};
