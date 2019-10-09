import { RequestOptions } from '@algolia/transporter-types';
import { UserInsightsClient } from '../../UserInsightsClient';
import { EventEnum } from '../types/EventType';
import { ConstructorOf } from '@algolia/support';
import { SendEventResponse } from '../types/SendEventResponse';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const clickedObjectIDsAfterSearch = <
  TUserInsightsClient extends ConstructorOf<UserInsightsClient>
>(
  base: TUserInsightsClient
) => {
  return class extends base implements HasClickedObjectIDsAfterSearch {
    public clickedObjectIDsAfterSearch(
      event: ClickedObjectIDsAfterSearchEvent,
      requestOptions?: RequestOptions
    ): Readonly<Promise<SendEventResponse>> {
      return this.client.sendEvent(
        {
          eventType: EventEnum.Click,
          eventName: event.eventName,
          index: event.indexName,
          userToken: this.userToken,
          objectIDs: event.objectIDs,
          positions: event.positions,
          queryID: event.queryID,
        },
        requestOptions
      );
    }
  };
};

export type HasClickedObjectIDsAfterSearch = UserInsightsClient & {
  readonly clickedObjectIDsAfterSearch: (
    event: ClickedObjectIDsAfterSearchEvent,
    requestOptions?: RequestOptions
  ) => Readonly<Promise<SendEventResponse>>;
};
