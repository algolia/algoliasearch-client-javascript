type HighlightMatch = {
  readonly value: string;
  readonly matchLevel: 'none' | 'partial' | 'full';
  readonly matchedWords: readonly string[];
  readonly fullyHighlighted?: boolean;
};

type Highlight<THit> = THit extends string | number
  ? HighlightMatch
  : {
      [KAttribute in keyof THit]: Highlight<THit[KAttribute]>;
    };

type SnippetMatch = {
  readonly value: string;
  readonly matchLevel: 'none' | 'partial' | 'full';
};

type Snippet<THit> = THit extends string | number
  ? SnippetMatch
  : {
      [KAttribute in keyof THit]: Snippet<THit[KAttribute]>;
    };

export type Hit<THit> = THit & {
  readonly objectID: string;
  readonly _highlightResult?: Highlight<THit>;
  readonly _snippetResult?: Snippet<THit>;
  readonly _rankingInfo?: {
    readonly promoted: boolean;
    readonly nbTypos: number;
    readonly firstMatchedWord: number;
    readonly proximityDistance?: number;
    readonly geoDistance: number;
    readonly geoPrecision?: number;
    readonly nbExactWords: number;
    readonly words: number;
    readonly filters: number;
    readonly userScore: number;
    readonly matchedGeoLocation?: {
      readonly lat: number;
      readonly lng: number;
      readonly distance: number;
    };
  };
  readonly _distinctSeqID?: number;
};
