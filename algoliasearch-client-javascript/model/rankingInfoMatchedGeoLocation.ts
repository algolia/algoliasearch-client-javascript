export class RankingInfoMatchedGeoLocation {
  /**
   * Latitude of the matched location.
   */
  'lat'?: number;
  /**
   * Longitude of the matched location.
   */
  'lng'?: number;
  /**
   * Distance between the matched location and the search location (in meters).
   */
  'distance'?: number;

  static discriminator: string | undefined = undefined;

  static attributeTypeMap: Array<{ name: string; baseName: string; type: string }> = [
    {
      name: 'lat',
      baseName: 'lat',
      type: 'number',
    },
    {
      name: 'lng',
      baseName: 'lng',
      type: 'number',
    },
    {
      name: 'distance',
      baseName: 'distance',
      type: 'number',
    },
  ];

  static getAttributeTypeMap() {
    return RankingInfoMatchedGeoLocation.attributeTypeMap;
  }
}
