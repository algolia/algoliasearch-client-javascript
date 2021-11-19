import { RequestFile } from './models';

export class SearchParamsString {
  'params'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'params',
      baseName: 'params',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return SearchParamsString.attributeTypeMap;
  }
}
