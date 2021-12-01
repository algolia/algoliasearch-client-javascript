import type { MultipleQueries } from './multipleQueries';

export type MultipleQueriesObject = {
  requests: MultipleQueries[];
  strategy?: MultipleQueriesObject.StrategyEnum;
};

export namespace MultipleQueriesObject {
  export enum StrategyEnum {
    None = 'none',
    StopIfEnoughMatches = 'stopIfEnoughMatches',
  }
}
