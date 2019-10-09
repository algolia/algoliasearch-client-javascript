import { RequestOptions } from '@algolia/transporter-types';
import { UserInsightsClient, UserInsightsClientOptions } from '../../UserInsightsClient';
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
      options: UserInsightsClientOptions,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SendEventResponse>> {
      return this.client.sendEvent(
        {
          eventType: EventEnum.Conversion,
          eventName: options.eventName,
          index: options.indexName,
          userToken: this.userToken,
          objectIDs: options.objectIDs,
          queryID: options.queryID,
        },
        requestOptions
      );
    }
  };
};

export type HasConvertedObjectIDsAfterSearch = UserInsightsClient & {
  readonly convertedObjectIDsAfterSearch: (
    options: UserInsightsClientOptions,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SendEventResponse>>;
};
