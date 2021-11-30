import { MultipleQueries } from './multipleQueries';

export type MultipleQueriesObject = {
  requests: Array<MultipleQueries>;
  strategy?: MultipleQueriesObject.StrategyEnum;
};

export namespace MultipleQueriesObject {
  export enum StrategyEnum {
    None = 'none',
    StopIfEnoughMatches = 'stopIfEnoughMatches',
  }
}
