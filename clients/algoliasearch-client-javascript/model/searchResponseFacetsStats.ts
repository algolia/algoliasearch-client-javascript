export class SearchResponseFacetsStats {
  /**
   * The minimum value in the result set.
   */
  'min'?: number;
  /**
   * The maximum value in the result set.
   */
  'max'?: number;
  /**
   * The average facet value in the result set.
   */
  'avg'?: number;
  /**
   * The sum of all values in the result set.
   */
  'sum'?: number;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'min',
      baseName: 'min',
      type: 'number',
    },
    {
      name: 'max',
      baseName: 'max',
      type: 'number',
    },
    {
      name: 'avg',
      baseName: 'avg',
      type: 'number',
    },
    {
      name: 'sum',
      baseName: 'sum',
      type: 'number',
    },
  ];

  static getAttributeTypeMap() {
    return SearchResponseFacetsStats.attributeTypeMap;
  }
}
