export const Strategy: { readonly [key: string]: StrategyType } = {
  None: 'none',
  StopIfEnoughMatches: 'stopIfEnoughMatches',
};

export type StrategyType = 'none' | 'stopIfEnoughMatches';
