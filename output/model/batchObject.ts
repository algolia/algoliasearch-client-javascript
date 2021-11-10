import { RequestFile } from './models';
import { Operation } from './operation';

export class BatchObject {
  'requests'?: Array<Operation>;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'requests',
      baseName: 'requests',
      type: 'Array<Operation>',
    },
  ];

  static getAttributeTypeMap() {
    return BatchObject.attributeTypeMap;
  }
}
