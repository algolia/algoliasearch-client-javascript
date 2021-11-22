export class SnippetResult {
  /**
   * Markup text with occurrences highlighted.
   */
  'value'?: string;
  /**
   * Indicates how well the attribute matched the search query.
   */
  'matchLevel'?: SnippetResult.MatchLevelEnum;

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
      type: 'SnippetResult.MatchLevelEnum',
    },
  ];

  static getAttributeTypeMap() {
    return SnippetResult.attributeTypeMap;
  }
}

export namespace SnippetResult {
  export enum MatchLevelEnum {
    None = <any>'none',
    Partial = <any>'partial',
    Full = <any>'full',
  }
}
