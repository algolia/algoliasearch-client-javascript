export class HighlightResult {
  /**
   * Markup text with occurrences highlighted.
   */
  'value'?: string;
  /**
   * Indicates how well the attribute matched the search query.
   */
  'matchLevel'?: HighlightResult.MatchLevelEnum;
  /**
   * List of words from the query that matched the object.
   */
  'matchedWords'?: Array<string>;
  /**
   * Whether the entire attribute value is highlighted.
   */
  'fullyHighlighted'?: boolean;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'value',
      baseName: 'value',
      type: 'string',
    },
    {
      name: 'matchLevel',
      baseName: 'matchLevel',
      type: 'HighlightResult.MatchLevelEnum',
    },
    {
      name: 'matchedWords',
      baseName: 'matchedWords',
      type: 'Array<string>',
    },
    {
      name: 'fullyHighlighted',
      baseName: 'fullyHighlighted',
      type: 'boolean',
    },
  ];

  static getAttributeTypeMap() {
    return HighlightResult.attributeTypeMap;
  }
}

export namespace HighlightResult {
  export enum MatchLevelEnum {
    None = <any>'none',
    Partial = <any>'partial',
    Full = <any>'full',
  }
}
