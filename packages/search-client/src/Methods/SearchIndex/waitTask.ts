import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { HasGetTask, getTask } from './getTask';

export const waitTask = <TSearchIndex extends ConstructorOf<SearchIndex & HasGetTask>>(
  base: TSearchIndex
) => {
  const Index = class extends base implements HasWaitTask {
    public waitTask(taskID: number, requestOptions?: RequestOptions): Promise<void> {
      const retry = (resolve: Function): void => {
        this.getTask(taskID, requestOptions).then(response => {
          if (response.status === 'published') {
            resolve();
            return;
          }

          retry(resolve);
        });
      };

      return new Promise<void>(resolve => retry(resolve));
    }
  };

  return getTask(Index);
};

export interface HasWaitTask extends HasGetTask {
  waitTask(taskID: number, requestOptions?: RequestOptions): Promise<void>;
}
