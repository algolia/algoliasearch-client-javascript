import { RequestOptions } from '@algolia/transporter-types';
import { UserInsightsClient } from '../../UserInsightsClient';
import { EventEnum } from '../types/EventType';
import { ConstructorOf } from '@algolia/support';
import { SendEventResponse } from '../types/SendEventResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const convertedObjectIDs = <TUserInsightsClient extends ConstructorOf<UserInsightsClient>>(
  base: TUserInsightsClient
) => {
  return class extends base implements HasConvertedObjectIDs {
    public convertedObjectIDs(
      event: ConvertedObjectIDsEvent,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SendEventResponse>> {
      return this.client.sendEvent(
        {
          eventType: EventEnum.Click,
          eventName: event.eventName,
          index: event.indexName,
          userToken: this.userToken,
          objectIDs: event.objectIDs,
        },
        requestOptions
      );
    }
  };
};

export type HasConvertedObjectIDs = UserInsightsClient & {
  readonly convertedObjectIDs: (
    event: ConvertedObjectIDsEvent,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SendEventResponse>>;
};
