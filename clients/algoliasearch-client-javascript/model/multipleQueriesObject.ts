import { MultipleQueries } from './multipleQueries';

export class MultipleQueriesObject {
  'requests': Array<MultipleQueries>;
  'strategy'?: MultipleQueriesObject.StrategyEnum;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'requests',
      baseName: 'requests',
      type: 'Array<MultipleQueries>',
    },
    {
      name: 'strategy',
      baseName: 'strategy',
      type: 'MultipleQueriesObject.StrategyEnum',
    },
  ];

  static getAttributeTypeMap() {
    return MultipleQueriesObject.attributeTypeMap;
  }
}

export namespace MultipleQueriesObject {
  export enum StrategyEnum {
    None = <any>'none',
    StopIfEnoughMatches = <any>'stopIfEnoughMatches',
  }
}
