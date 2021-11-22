/**
 * Error
 */
// export class ErrorBase extends null<String, object>
export class ErrorBase {
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
    return ErrorBase.attributeTypeMap;
  }
}
