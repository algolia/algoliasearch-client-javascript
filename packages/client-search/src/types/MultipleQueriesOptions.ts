export const StrategyEnum: { readonly [key: string]: StrategyType } = {
  None: 'none',
  StopIfEnoughMatches: 'stopIfEnoughMatches',
};

export type StrategyType = 'none' | 'stopIfEnoughMatches';

export type MultipleQueriesOptions = {
  readonly strategy?: StrategyType;
};
