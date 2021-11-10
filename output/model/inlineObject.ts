import { RequestFile } from './models';
import { MultipleQueries } from './multipleQueries';

export class InlineObject {
  'requests': Array<MultipleQueries>;
  'strategy'?: InlineObject.StrategyEnum;

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
      type: 'InlineObject.StrategyEnum',
    },
  ];

  static getAttributeTypeMap() {
    return InlineObject.attributeTypeMap;
  }
}

export namespace InlineObject {
  export enum StrategyEnum {
    None = <any>'none',
    StopIfEnoughMatches = <any>'stopIfEnoughMatches',
  }
}
