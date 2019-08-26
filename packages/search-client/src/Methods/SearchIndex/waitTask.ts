import { RequestOptions } from '@algolia/transporter-types';
import { SearchIndex } from '../../SearchIndex';
import { ConstructorOf } from '../../helpers';
import { getTask, HasGetTask } from './getTask';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const waitTask = <TSearchIndex extends ConstructorOf<SearchIndex>>(base: TSearchIndex) => {
  const Mixin: ConstructorOf<SearchIndex & HasGetTask> = getTask(base);

  return class extends Mixin implements HasWaitTask {
    public waitTask(taskID: number, requestOptions?: RequestOptions): Promise<void> {
      const retry = (resolve: Function): void => {
        this.getTask(taskID, requestOptions).then(response => {
          if (response.status === 'published') {
            resolve();
          } else {
            retry(resolve);
          }
        });
      };

      return new Promise<void>(resolve => retry(resolve));
    }
  };
};

export type HasWaitTask = {
  readonly waitTask: (taskID: number, requestOptions?: RequestOptions) => Promise<void>;
};
