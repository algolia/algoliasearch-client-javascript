import { RequestFile } from './models';

/**
 * Error
 */
export class ModelError extends null<String, object> {
  'message'?: string;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'message',
      baseName: 'message',
      type: 'string',
    },
  ];

  static getAttributeTypeMap() {
    return super.getAttributeTypeMap().concat(ModelError.attributeTypeMap);
  }
}
