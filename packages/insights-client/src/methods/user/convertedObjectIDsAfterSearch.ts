import { RequestOptions } from '@algolia/transporter-types';
import { UserInsightsClient } from '../../UserInsightsClient';
import { EventEnum } from '../types/EventType';
import { ConstructorOf } from '@algolia/support';
import { SendEventResponse } from '../types/SendEventResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const convertedObjectIDsAfterSearch = <
  TUserInsightsClient extends ConstructorOf<UserInsightsClient>
>(
  base: TUserInsightsClient
) => {
  return class extends base implements HasConvertedObjectIDsAfterSearch {
    public convertedObjectIDsAfterSearch(
      event: ConvertedObjectIDsEventAfterSearch,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SendEventResponse>> {
      return this.client.sendEvent(
        {
          eventType: EventEnum.Conversion,
          eventName: event.eventName,
          index: event.indexName,
          userToken: this.userToken,
          objectIDs: event.objectIDs,
          queryID: event.queryID,
        },
        requestOptions
      );
    }
  };
};

export type HasConvertedObjectIDsAfterSearch = UserInsightsClient & {
  readonly convertedObjectIDsAfterSearch: (
    event: ConvertedObjectIDsEventAfterSearch,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SendEventResponse>>;
};
