type HighlightMatch = {
  readonly value: string;
  readonly matchLevel: 'none' | 'partial' | 'full';
  readonly matchedWords: readonly string[];
  readonly fullyHighlighted?: boolean;
};

export type HighlightResult<THit> = THit extends string | number
  ? HighlightMatch
  : {
      [KAttribute in keyof THit]?: HighlightResult<THit[KAttribute]>;
    };

type SnippetMatch = {
  readonly value: string;
  readonly matchLevel: 'none' | 'partial' | 'full';
};

export type SnippetResult<THit> = THit extends string | number
  ? SnippetMatch
  : {
      [KAttribute in keyof THit]: SnippetResult<THit[KAttribute]>;
    };

export type RankingInfo = {
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
  readonly personalization?: {
    readonly filtersScore: number;
    readonly rankingScore: number;
    readonly score: number;
  };
};

export type Hit<THit> = THit & {
  readonly objectID: string;
  readonly _highlightResult?: HighlightResult<THit>;
  readonly _snippetResult?: SnippetResult<THit>;
  readonly _rankingInfo?: RankingInfo;
  readonly _distinctSeqID?: number;
};
