import { RequestOptions } from '@algolia/transporter-types';
import { UserInsightsClient, UserInsightsClientOptions } from '../../UserInsightsClient';
import { EventEnum } from '../types/EventType';
import { ConstructorOf } from '@algolia/support';
import { SendEventResponse } from '../types/SendEventResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const convertedObjectIDs = <TUserInsightsClient extends ConstructorOf<UserInsightsClient>>(
  base: TUserInsightsClient
) => {
  return class extends base implements HasConvertedObjectIDs {
    public convertedObjectIDs(
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

export type HasConvertedObjectIDs = UserInsightsClient & {
  readonly convertedObjectIDs: (
    options: UserInsightsClientOptions,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SendEventResponse>>;
};
