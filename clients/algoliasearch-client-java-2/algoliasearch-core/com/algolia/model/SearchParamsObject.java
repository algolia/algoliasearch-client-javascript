package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import org.openapitools.jackson.nullable.JsonNullable;

/** SearchParamsObject */
public class SearchParamsObject {

  public static final String SERIALIZED_NAME_QUERY = "query";

  @SerializedName(SERIALIZED_NAME_QUERY)
  private String query = "";

  public static final String SERIALIZED_NAME_SIMILAR_QUERY = "similarQuery";

  @SerializedName(SERIALIZED_NAME_SIMILAR_QUERY)
  private String similarQuery = "";

  public static final String SERIALIZED_NAME_FILTERS = "filters";

  @SerializedName(SERIALIZED_NAME_FILTERS)
  private String filters = "";

  public static final String SERIALIZED_NAME_FACET_FILTERS = "facetFilters";

  @SerializedName(SERIALIZED_NAME_FACET_FILTERS)
  private List<String> facetFilters = null;

  public static final String SERIALIZED_NAME_OPTIONAL_FILTERS =
    "optionalFilters";

  @SerializedName(SERIALIZED_NAME_OPTIONAL_FILTERS)
  private List<String> optionalFilters = null;

  public static final String SERIALIZED_NAME_NUMERIC_FILTERS = "numericFilters";

  @SerializedName(SERIALIZED_NAME_NUMERIC_FILTERS)
  private List<String> numericFilters = null;

  public static final String SERIALIZED_NAME_TAG_FILTERS = "tagFilters";

  @SerializedName(SERIALIZED_NAME_TAG_FILTERS)
  private List<String> tagFilters = null;

  public static final String SERIALIZED_NAME_SUM_OR_FILTERS_SCORES =
    "sumOrFiltersScores";

  @SerializedName(SERIALIZED_NAME_SUM_OR_FILTERS_SCORES)
  private Boolean sumOrFiltersScores = false;

  public static final String SERIALIZED_NAME_FACETS = "facets";

  @SerializedName(SERIALIZED_NAME_FACETS)
  private List<String> facets = null;

  public static final String SERIALIZED_NAME_MAX_VALUES_PER_FACET =
    "maxValuesPerFacet";

  @SerializedName(SERIALIZED_NAME_MAX_VALUES_PER_FACET)
  private Integer maxValuesPerFacet = 100;

  public static final String SERIALIZED_NAME_FACETING_AFTER_DISTINCT =
    "facetingAfterDistinct";

  @SerializedName(SERIALIZED_NAME_FACETING_AFTER_DISTINCT)
  private Boolean facetingAfterDistinct = false;

  public static final String SERIALIZED_NAME_SORT_FACET_VALUES_BY =
    "sortFacetValuesBy";

  @SerializedName(SERIALIZED_NAME_SORT_FACET_VALUES_BY)
  private String sortFacetValuesBy = "count";

  public static final String SERIALIZED_NAME_PAGE = "page";

  @SerializedName(SERIALIZED_NAME_PAGE)
  private Integer page = 0;

  public static final String SERIALIZED_NAME_OFFSET = "offset";

  @SerializedName(SERIALIZED_NAME_OFFSET)
  private Integer offset;

  public static final String SERIALIZED_NAME_LENGTH = "length";

  @SerializedName(SERIALIZED_NAME_LENGTH)
  private Integer length;

  public static final String SERIALIZED_NAME_AROUND_LAT_LNG = "aroundLatLng";

  @SerializedName(SERIALIZED_NAME_AROUND_LAT_LNG)
  private String aroundLatLng = "";

  public static final String SERIALIZED_NAME_AROUND_LAT_LNG_VIA_I_P =
    "aroundLatLngViaIP";

  @SerializedName(SERIALIZED_NAME_AROUND_LAT_LNG_VIA_I_P)
  private Boolean aroundLatLngViaIP = false;

  public static final String SERIALIZED_NAME_AROUND_RADIUS = "aroundRadius";

  @SerializedName(SERIALIZED_NAME_AROUND_RADIUS)
  private OneOfintegerstring aroundRadius;

  public static final String SERIALIZED_NAME_AROUND_PRECISION =
    "aroundPrecision";

  @SerializedName(SERIALIZED_NAME_AROUND_PRECISION)
  private Integer aroundPrecision = 10;

  public static final String SERIALIZED_NAME_MINIMUM_AROUND_RADIUS =
    "minimumAroundRadius";

  @SerializedName(SERIALIZED_NAME_MINIMUM_AROUND_RADIUS)
  private Integer minimumAroundRadius;

  public static final String SERIALIZED_NAME_INSIDE_BOUNDING_BOX =
    "insideBoundingBox";

  @SerializedName(SERIALIZED_NAME_INSIDE_BOUNDING_BOX)
  private List<BigDecimal> insideBoundingBox = null;

  public static final String SERIALIZED_NAME_INSIDE_POLYGON = "insidePolygon";

  @SerializedName(SERIALIZED_NAME_INSIDE_POLYGON)
  private List<BigDecimal> insidePolygon = null;

  public static final String SERIALIZED_NAME_NATURAL_LANGUAGES =
    "naturalLanguages";

  @SerializedName(SERIALIZED_NAME_NATURAL_LANGUAGES)
  private List<String> naturalLanguages = null;

  public static final String SERIALIZED_NAME_RULE_CONTEXTS = "ruleContexts";

  @SerializedName(SERIALIZED_NAME_RULE_CONTEXTS)
  private List<String> ruleContexts = null;

  public static final String SERIALIZED_NAME_PERSONALIZATION_IMPACT =
    "personalizationImpact";

  @SerializedName(SERIALIZED_NAME_PERSONALIZATION_IMPACT)
  private Integer personalizationImpact = 100;

  public static final String SERIALIZED_NAME_USER_TOKEN = "userToken";

  @SerializedName(SERIALIZED_NAME_USER_TOKEN)
  private String userToken;

  public static final String SERIALIZED_NAME_GET_RANKING_INFO =
    "getRankingInfo";

  @SerializedName(SERIALIZED_NAME_GET_RANKING_INFO)
  private Boolean getRankingInfo = false;

  public static final String SERIALIZED_NAME_CLICK_ANALYTICS = "clickAnalytics";

  @SerializedName(SERIALIZED_NAME_CLICK_ANALYTICS)
  private Boolean clickAnalytics = false;

  public static final String SERIALIZED_NAME_ANALYTICS = "analytics";

  @SerializedName(SERIALIZED_NAME_ANALYTICS)
  private Boolean analytics = true;

  public static final String SERIALIZED_NAME_ANALYTICS_TAGS = "analyticsTags";

  @SerializedName(SERIALIZED_NAME_ANALYTICS_TAGS)
  private List<String> analyticsTags = null;

  public static final String SERIALIZED_NAME_PERCENTILE_COMPUTATION =
    "percentileComputation";

  @SerializedName(SERIALIZED_NAME_PERCENTILE_COMPUTATION)
  private Boolean percentileComputation = true;

  public static final String SERIALIZED_NAME_ENABLE_A_B_TEST = "enableABTest";

  @SerializedName(SERIALIZED_NAME_ENABLE_A_B_TEST)
  private Boolean enableABTest = true;

  public static final String SERIALIZED_NAME_ENABLE_RE_RANKING =
    "enableReRanking";

  @SerializedName(SERIALIZED_NAME_ENABLE_RE_RANKING)
  private Boolean enableReRanking = true;

  public static final String SERIALIZED_NAME_SEARCHABLE_ATTRIBUTES =
    "searchableAttributes";

  @SerializedName(SERIALIZED_NAME_SEARCHABLE_ATTRIBUTES)
  private List<String> searchableAttributes = null;

  public static final String SERIALIZED_NAME_ATTRIBUTES_FOR_FACETING =
    "attributesForFaceting";

  @SerializedName(SERIALIZED_NAME_ATTRIBUTES_FOR_FACETING)
  private List<String> attributesForFaceting = null;

  public static final String SERIALIZED_NAME_UNRETRIEVABLE_ATTRIBUTES =
    "unretrievableAttributes";

  @SerializedName(SERIALIZED_NAME_UNRETRIEVABLE_ATTRIBUTES)
  private List<String> unretrievableAttributes = null;

  public static final String SERIALIZED_NAME_ATTRIBUTES_TO_RETRIEVE =
    "attributesToRetrieve";

  @SerializedName(SERIALIZED_NAME_ATTRIBUTES_TO_RETRIEVE)
  private List<String> attributesToRetrieve = null;

  public static final String SERIALIZED_NAME_RESTRICT_SEARCHABLE_ATTRIBUTES =
    "restrictSearchableAttributes";

  @SerializedName(SERIALIZED_NAME_RESTRICT_SEARCHABLE_ATTRIBUTES)
  private List<String> restrictSearchableAttributes = null;

  public static final String SERIALIZED_NAME_RANKING = "ranking";

  @SerializedName(SERIALIZED_NAME_RANKING)
  private List<String> ranking = null;

  public static final String SERIALIZED_NAME_CUSTOM_RANKING = "customRanking";

  @SerializedName(SERIALIZED_NAME_CUSTOM_RANKING)
  private List<String> customRanking = null;

  public static final String SERIALIZED_NAME_RELEVANCY_STRICTNESS =
    "relevancyStrictness";

  @SerializedName(SERIALIZED_NAME_RELEVANCY_STRICTNESS)
  private Integer relevancyStrictness = 100;

  public static final String SERIALIZED_NAME_ATTRIBUTES_TO_HIGHLIGHT =
    "attributesToHighlight";

  @SerializedName(SERIALIZED_NAME_ATTRIBUTES_TO_HIGHLIGHT)
  private List<String> attributesToHighlight = null;

  public static final String SERIALIZED_NAME_ATTRIBUTES_TO_SNIPPET =
    "attributesToSnippet";

  @SerializedName(SERIALIZED_NAME_ATTRIBUTES_TO_SNIPPET)
  private List<String> attributesToSnippet = null;

  public static final String SERIALIZED_NAME_HIGHLIGHT_PRE_TAG =
    "highlightPreTag";

  @SerializedName(SERIALIZED_NAME_HIGHLIGHT_PRE_TAG)
  private String highlightPreTag = "<em>";

  public static final String SERIALIZED_NAME_HIGHLIGHT_POST_TAG =
    "highlightPostTag";

  @SerializedName(SERIALIZED_NAME_HIGHLIGHT_POST_TAG)
  private String highlightPostTag = "</em>";

  public static final String SERIALIZED_NAME_SNIPPET_ELLIPSIS_TEXT =
    "snippetEllipsisText";

  @SerializedName(SERIALIZED_NAME_SNIPPET_ELLIPSIS_TEXT)
  private String snippetEllipsisText = "…";

  public static final String SERIALIZED_NAME_RESTRICT_HIGHLIGHT_AND_SNIPPET_ARRAYS =
    "restrictHighlightAndSnippetArrays";

  @SerializedName(SERIALIZED_NAME_RESTRICT_HIGHLIGHT_AND_SNIPPET_ARRAYS)
  private Boolean restrictHighlightAndSnippetArrays = false;

  public static final String SERIALIZED_NAME_HITS_PER_PAGE = "hitsPerPage";

  @SerializedName(SERIALIZED_NAME_HITS_PER_PAGE)
  private Integer hitsPerPage = 20;

  public static final String SERIALIZED_NAME_MIN_WORD_SIZEFOR1_TYPO =
    "minWordSizefor1Typo";

  @SerializedName(SERIALIZED_NAME_MIN_WORD_SIZEFOR1_TYPO)
  private Integer minWordSizefor1Typo = 4;

  public static final String SERIALIZED_NAME_MIN_WORD_SIZEFOR2_TYPOS =
    "minWordSizefor2Typos";

  @SerializedName(SERIALIZED_NAME_MIN_WORD_SIZEFOR2_TYPOS)
  private Integer minWordSizefor2Typos = 8;

  /** Controls whether typo tolerance is enabled and how it is applied. */
  @JsonAdapter(TypoToleranceEnum.Adapter.class)
  public enum TypoToleranceEnum {
    TRUE("true"),

    FALSE("false"),

    MIN("min"),

    STRICT("strict");

    private String value;

    TypoToleranceEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static TypoToleranceEnum fromValue(String value) {
      for (TypoToleranceEnum b : TypoToleranceEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<TypoToleranceEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final TypoToleranceEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public TypoToleranceEnum read(final JsonReader jsonReader)
        throws IOException {
        String value = jsonReader.nextString();
        return TypoToleranceEnum.fromValue(value);
      }
    }
  }

  public static final String SERIALIZED_NAME_TYPO_TOLERANCE = "typoTolerance";

  @SerializedName(SERIALIZED_NAME_TYPO_TOLERANCE)
  private TypoToleranceEnum typoTolerance = TypoToleranceEnum.TRUE;

  public static final String SERIALIZED_NAME_ALLOW_TYPOS_ON_NUMERIC_TOKENS =
    "allowTyposOnNumericTokens";

  @SerializedName(SERIALIZED_NAME_ALLOW_TYPOS_ON_NUMERIC_TOKENS)
  private Boolean allowTyposOnNumericTokens = true;

  public static final String SERIALIZED_NAME_DISABLE_TYPO_TOLERANCE_ON_ATTRIBUTES =
    "disableTypoToleranceOnAttributes";

  @SerializedName(SERIALIZED_NAME_DISABLE_TYPO_TOLERANCE_ON_ATTRIBUTES)
  private List<String> disableTypoToleranceOnAttributes = null;

  public static final String SERIALIZED_NAME_SEPARATORS_TO_INDEX =
    "separatorsToIndex";

  @SerializedName(SERIALIZED_NAME_SEPARATORS_TO_INDEX)
  private String separatorsToIndex = "";

  public static final String SERIALIZED_NAME_IGNORE_PLURALS = "ignorePlurals";

  @SerializedName(SERIALIZED_NAME_IGNORE_PLURALS)
  private String ignorePlurals = "false";

  public static final String SERIALIZED_NAME_REMOVE_STOP_WORDS =
    "removeStopWords";

  @SerializedName(SERIALIZED_NAME_REMOVE_STOP_WORDS)
  private String removeStopWords = "false";

  public static final String SERIALIZED_NAME_KEEP_DIACRITICS_ON_CHARACTERS =
    "keepDiacriticsOnCharacters";

  @SerializedName(SERIALIZED_NAME_KEEP_DIACRITICS_ON_CHARACTERS)
  private String keepDiacriticsOnCharacters = "";

  public static final String SERIALIZED_NAME_QUERY_LANGUAGES = "queryLanguages";

  @SerializedName(SERIALIZED_NAME_QUERY_LANGUAGES)
  private List<String> queryLanguages = null;

  public static final String SERIALIZED_NAME_DECOMPOUND_QUERY =
    "decompoundQuery";

  @SerializedName(SERIALIZED_NAME_DECOMPOUND_QUERY)
  private Boolean decompoundQuery = true;

  public static final String SERIALIZED_NAME_ENABLE_RULES = "enableRules";

  @SerializedName(SERIALIZED_NAME_ENABLE_RULES)
  private Boolean enableRules = true;

  public static final String SERIALIZED_NAME_ENABLE_PERSONALIZATION =
    "enablePersonalization";

  @SerializedName(SERIALIZED_NAME_ENABLE_PERSONALIZATION)
  private Boolean enablePersonalization = false;

  /** Controls if and how query words are interpreted as prefixes. */
  @JsonAdapter(QueryTypeEnum.Adapter.class)
  public enum QueryTypeEnum {
    PREFIXLAST("prefixLast"),

    PREFIXALL("prefixAll"),

    PREFIXNONE("prefixNone");

    private String value;

    QueryTypeEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static QueryTypeEnum fromValue(String value) {
      for (QueryTypeEnum b : QueryTypeEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<QueryTypeEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final QueryTypeEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public QueryTypeEnum read(final JsonReader jsonReader)
        throws IOException {
        String value = jsonReader.nextString();
        return QueryTypeEnum.fromValue(value);
      }
    }
  }

  public static final String SERIALIZED_NAME_QUERY_TYPE = "queryType";

  @SerializedName(SERIALIZED_NAME_QUERY_TYPE)
  private QueryTypeEnum queryType = QueryTypeEnum.PREFIXLAST;

  /** Selects a strategy to remove words from the query when it doesn't match any hits. */
  @JsonAdapter(RemoveWordsIfNoResultsEnum.Adapter.class)
  public enum RemoveWordsIfNoResultsEnum {
    NONE("none"),

    LASTWORDS("lastWords"),

    FIRSTWORDS("firstWords"),

    ALLOPTIONAL("allOptional");

    private String value;

    RemoveWordsIfNoResultsEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static RemoveWordsIfNoResultsEnum fromValue(String value) {
      for (RemoveWordsIfNoResultsEnum b : RemoveWordsIfNoResultsEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter
      extends TypeAdapter<RemoveWordsIfNoResultsEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final RemoveWordsIfNoResultsEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public RemoveWordsIfNoResultsEnum read(final JsonReader jsonReader)
        throws IOException {
        String value = jsonReader.nextString();
        return RemoveWordsIfNoResultsEnum.fromValue(value);
      }
    }
  }

  public static final String SERIALIZED_NAME_REMOVE_WORDS_IF_NO_RESULTS =
    "removeWordsIfNoResults";

  @SerializedName(SERIALIZED_NAME_REMOVE_WORDS_IF_NO_RESULTS)
  private RemoveWordsIfNoResultsEnum removeWordsIfNoResults =
    RemoveWordsIfNoResultsEnum.NONE;

  public static final String SERIALIZED_NAME_ADVANCED_SYNTAX = "advancedSyntax";

  @SerializedName(SERIALIZED_NAME_ADVANCED_SYNTAX)
  private Boolean advancedSyntax = false;

  public static final String SERIALIZED_NAME_OPTIONAL_WORDS = "optionalWords";

  @SerializedName(SERIALIZED_NAME_OPTIONAL_WORDS)
  private List<String> optionalWords = null;

  public static final String SERIALIZED_NAME_DISABLE_EXACT_ON_ATTRIBUTES =
    "disableExactOnAttributes";

  @SerializedName(SERIALIZED_NAME_DISABLE_EXACT_ON_ATTRIBUTES)
  private List<String> disableExactOnAttributes = null;

  /** Controls how the exact ranking criterion is computed when the query contains only one word. */
  @JsonAdapter(ExactOnSingleWordQueryEnum.Adapter.class)
  public enum ExactOnSingleWordQueryEnum {
    ATTRIBUTE("attribute"),

    NONE("none"),

    WORD("word");

    private String value;

    ExactOnSingleWordQueryEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static ExactOnSingleWordQueryEnum fromValue(String value) {
      for (ExactOnSingleWordQueryEnum b : ExactOnSingleWordQueryEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter
      extends TypeAdapter<ExactOnSingleWordQueryEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final ExactOnSingleWordQueryEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public ExactOnSingleWordQueryEnum read(final JsonReader jsonReader)
        throws IOException {
        String value = jsonReader.nextString();
        return ExactOnSingleWordQueryEnum.fromValue(value);
      }
    }
  }

  public static final String SERIALIZED_NAME_EXACT_ON_SINGLE_WORD_QUERY =
    "exactOnSingleWordQuery";

  @SerializedName(SERIALIZED_NAME_EXACT_ON_SINGLE_WORD_QUERY)
  private ExactOnSingleWordQueryEnum exactOnSingleWordQuery =
    ExactOnSingleWordQueryEnum.ATTRIBUTE;

  /** Gets or Sets alternativesAsExact */
  @JsonAdapter(AlternativesAsExactEnum.Adapter.class)
  public enum AlternativesAsExactEnum {
    IGNOREPLURALS("ignorePlurals"),

    SINGLEWORDSYNONYM("singleWordSynonym"),

    MULTIWORDSSYNONYM("multiWordsSynonym");

    private String value;

    AlternativesAsExactEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static AlternativesAsExactEnum fromValue(String value) {
      for (AlternativesAsExactEnum b : AlternativesAsExactEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<AlternativesAsExactEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final AlternativesAsExactEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public AlternativesAsExactEnum read(final JsonReader jsonReader)
        throws IOException {
        String value = jsonReader.nextString();
        return AlternativesAsExactEnum.fromValue(value);
      }
    }
  }

  public static final String SERIALIZED_NAME_ALTERNATIVES_AS_EXACT =
    "alternativesAsExact";

  @SerializedName(SERIALIZED_NAME_ALTERNATIVES_AS_EXACT)
  private List<AlternativesAsExactEnum> alternativesAsExact = null;

  /** Gets or Sets advancedSyntaxFeatures */
  @JsonAdapter(AdvancedSyntaxFeaturesEnum.Adapter.class)
  public enum AdvancedSyntaxFeaturesEnum {
    EXACTPHRASE("exactPhrase"),

    EXCLUDEWORDS("excludeWords");

    private String value;

    AdvancedSyntaxFeaturesEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static AdvancedSyntaxFeaturesEnum fromValue(String value) {
      for (AdvancedSyntaxFeaturesEnum b : AdvancedSyntaxFeaturesEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter
      extends TypeAdapter<AdvancedSyntaxFeaturesEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final AdvancedSyntaxFeaturesEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public AdvancedSyntaxFeaturesEnum read(final JsonReader jsonReader)
        throws IOException {
        String value = jsonReader.nextString();
        return AdvancedSyntaxFeaturesEnum.fromValue(value);
      }
    }
  }

  public static final String SERIALIZED_NAME_ADVANCED_SYNTAX_FEATURES =
    "advancedSyntaxFeatures";

  @SerializedName(SERIALIZED_NAME_ADVANCED_SYNTAX_FEATURES)
  private List<AdvancedSyntaxFeaturesEnum> advancedSyntaxFeatures = null;

  public static final String SERIALIZED_NAME_DISTINCT = "distinct";

  @SerializedName(SERIALIZED_NAME_DISTINCT)
  private Integer distinct = 0;

  public static final String SERIALIZED_NAME_SYNONYMS = "synonyms";

  @SerializedName(SERIALIZED_NAME_SYNONYMS)
  private Boolean synonyms = true;

  public static final String SERIALIZED_NAME_REPLACE_SYNONYMS_IN_HIGHLIGHT =
    "replaceSynonymsInHighlight";

  @SerializedName(SERIALIZED_NAME_REPLACE_SYNONYMS_IN_HIGHLIGHT)
  private Boolean replaceSynonymsInHighlight = false;

  public static final String SERIALIZED_NAME_MIN_PROXIMITY = "minProximity";

  @SerializedName(SERIALIZED_NAME_MIN_PROXIMITY)
  private Integer minProximity = 1;

  public static final String SERIALIZED_NAME_RESPONSE_FIELDS = "responseFields";

  @SerializedName(SERIALIZED_NAME_RESPONSE_FIELDS)
  private List<String> responseFields = null;

  public static final String SERIALIZED_NAME_MAX_FACET_HITS = "maxFacetHits";

  @SerializedName(SERIALIZED_NAME_MAX_FACET_HITS)
  private Integer maxFacetHits = 10;

  public static final String SERIALIZED_NAME_ATTRIBUTE_CRITERIA_COMPUTED_BY_MIN_PROXIMITY =
    "attributeCriteriaComputedByMinProximity";

  @SerializedName(SERIALIZED_NAME_ATTRIBUTE_CRITERIA_COMPUTED_BY_MIN_PROXIMITY)
  private Boolean attributeCriteriaComputedByMinProximity = false;

  public static final String SERIALIZED_NAME_RENDERING_CONTENT =
    "renderingContent";

  @SerializedName(SERIALIZED_NAME_RENDERING_CONTENT)
  private Object renderingContent = new Object();

  public SearchParamsObject query(String query) {
    this.query = query;
    return this;
  }

  /**
   * The text to search in the index.
   *
   * @return query
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "The text to search in the index.")
  public String getQuery() {
    return query;
  }

  public void setQuery(String query) {
    this.query = query;
  }

  public SearchParamsObject similarQuery(String similarQuery) {
    this.similarQuery = similarQuery;
    return this;
  }

  /**
   * Overrides the query parameter and performs a more generic search that can be used to find
   * \"similar\" results.
   *
   * @return similarQuery
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Overrides the query parameter and performs a more generic search that can be used to" +
    " find \"similar\" results."
  )
  public String getSimilarQuery() {
    return similarQuery;
  }

  public void setSimilarQuery(String similarQuery) {
    this.similarQuery = similarQuery;
  }

  public SearchParamsObject filters(String filters) {
    this.filters = filters;
    return this;
  }

  /**
   * Filter the query with numeric, facet and/or tag filters.
   *
   * @return filters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Filter the query with numeric, facet and/or tag filters."
  )
  public String getFilters() {
    return filters;
  }

  public void setFilters(String filters) {
    this.filters = filters;
  }

  public SearchParamsObject facetFilters(List<String> facetFilters) {
    this.facetFilters = facetFilters;
    return this;
  }

  public SearchParamsObject addFacetFiltersItem(String facetFiltersItem) {
    if (this.facetFilters == null) {
      this.facetFilters = new ArrayList<>();
    }
    this.facetFilters.add(facetFiltersItem);
    return this;
  }

  /**
   * Filter hits by facet value.
   *
   * @return facetFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Filter hits by facet value.")
  public List<String> getFacetFilters() {
    return facetFilters;
  }

  public void setFacetFilters(List<String> facetFilters) {
    this.facetFilters = facetFilters;
  }

  public SearchParamsObject optionalFilters(List<String> optionalFilters) {
    this.optionalFilters = optionalFilters;
    return this;
  }

  public SearchParamsObject addOptionalFiltersItem(String optionalFiltersItem) {
    if (this.optionalFilters == null) {
      this.optionalFilters = new ArrayList<>();
    }
    this.optionalFilters.add(optionalFiltersItem);
    return this;
  }

  /**
   * Create filters for ranking purposes, where records that match the filter are ranked higher, or
   * lower in the case of a negative optional filter.
   *
   * @return optionalFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Create filters for ranking purposes, where records that match the filter are ranked" +
    " higher, or lower in the case of a negative optional filter."
  )
  public List<String> getOptionalFilters() {
    return optionalFilters;
  }

  public void setOptionalFilters(List<String> optionalFilters) {
    this.optionalFilters = optionalFilters;
  }

  public SearchParamsObject numericFilters(List<String> numericFilters) {
    this.numericFilters = numericFilters;
    return this;
  }

  public SearchParamsObject addNumericFiltersItem(String numericFiltersItem) {
    if (this.numericFilters == null) {
      this.numericFilters = new ArrayList<>();
    }
    this.numericFilters.add(numericFiltersItem);
    return this;
  }

  /**
   * Filter on numeric attributes.
   *
   * @return numericFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Filter on numeric attributes.")
  public List<String> getNumericFilters() {
    return numericFilters;
  }

  public void setNumericFilters(List<String> numericFilters) {
    this.numericFilters = numericFilters;
  }

  public SearchParamsObject tagFilters(List<String> tagFilters) {
    this.tagFilters = tagFilters;
    return this;
  }

  public SearchParamsObject addTagFiltersItem(String tagFiltersItem) {
    if (this.tagFilters == null) {
      this.tagFilters = new ArrayList<>();
    }
    this.tagFilters.add(tagFiltersItem);
    return this;
  }

  /**
   * Filter hits by tags.
   *
   * @return tagFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Filter hits by tags.")
  public List<String> getTagFilters() {
    return tagFilters;
  }

  public void setTagFilters(List<String> tagFilters) {
    this.tagFilters = tagFilters;
  }

  public SearchParamsObject sumOrFiltersScores(Boolean sumOrFiltersScores) {
    this.sumOrFiltersScores = sumOrFiltersScores;
    return this;
  }

  /**
   * Determines how to calculate the total score for filtering.
   *
   * @return sumOrFiltersScores
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Determines how to calculate the total score for filtering."
  )
  public Boolean getSumOrFiltersScores() {
    return sumOrFiltersScores;
  }

  public void setSumOrFiltersScores(Boolean sumOrFiltersScores) {
    this.sumOrFiltersScores = sumOrFiltersScores;
  }

  public SearchParamsObject facets(List<String> facets) {
    this.facets = facets;
    return this;
  }

  public SearchParamsObject addFacetsItem(String facetsItem) {
    if (this.facets == null) {
      this.facets = new ArrayList<>();
    }
    this.facets.add(facetsItem);
    return this;
  }

  /**
   * Retrieve facets and their facet values.
   *
   * @return facets
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Retrieve facets and their facet values.")
  public List<String> getFacets() {
    return facets;
  }

  public void setFacets(List<String> facets) {
    this.facets = facets;
  }

  public SearchParamsObject maxValuesPerFacet(Integer maxValuesPerFacet) {
    this.maxValuesPerFacet = maxValuesPerFacet;
    return this;
  }

  /**
   * Maximum number of facet values to return for each facet during a regular search.
   *
   * @return maxValuesPerFacet
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Maximum number of facet values to return for each facet during a regular search."
  )
  public Integer getMaxValuesPerFacet() {
    return maxValuesPerFacet;
  }

  public void setMaxValuesPerFacet(Integer maxValuesPerFacet) {
    this.maxValuesPerFacet = maxValuesPerFacet;
  }

  public SearchParamsObject facetingAfterDistinct(
    Boolean facetingAfterDistinct
  ) {
    this.facetingAfterDistinct = facetingAfterDistinct;
    return this;
  }

  /**
   * Force faceting to be applied after de-duplication (via the Distinct setting).
   *
   * @return facetingAfterDistinct
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Force faceting to be applied after de-duplication (via the Distinct setting)."
  )
  public Boolean getFacetingAfterDistinct() {
    return facetingAfterDistinct;
  }

  public void setFacetingAfterDistinct(Boolean facetingAfterDistinct) {
    this.facetingAfterDistinct = facetingAfterDistinct;
  }

  public SearchParamsObject sortFacetValuesBy(String sortFacetValuesBy) {
    this.sortFacetValuesBy = sortFacetValuesBy;
    return this;
  }

  /**
   * Controls how facet values are fetched.
   *
   * @return sortFacetValuesBy
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Controls how facet values are fetched.")
  public String getSortFacetValuesBy() {
    return sortFacetValuesBy;
  }

  public void setSortFacetValuesBy(String sortFacetValuesBy) {
    this.sortFacetValuesBy = sortFacetValuesBy;
  }

  public SearchParamsObject page(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Specify the page to retrieve.
   *
   * @return page
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Specify the page to retrieve.")
  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  public SearchParamsObject offset(Integer offset) {
    this.offset = offset;
    return this;
  }

  /**
   * Specify the offset of the first hit to return.
   *
   * @return offset
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Specify the offset of the first hit to return.")
  public Integer getOffset() {
    return offset;
  }

  public void setOffset(Integer offset) {
    this.offset = offset;
  }

  public SearchParamsObject length(Integer length) {
    this.length = length;
    return this;
  }

  /**
   * Set the number of hits to retrieve (used only with offset). minimum: 1 maximum: 1000
   *
   * @return length
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Set the number of hits to retrieve (used only with offset)."
  )
  public Integer getLength() {
    return length;
  }

  public void setLength(Integer length) {
    this.length = length;
  }

  public SearchParamsObject aroundLatLng(String aroundLatLng) {
    this.aroundLatLng = aroundLatLng;
    return this;
  }

  /**
   * Search for entries around a central geolocation, enabling a geo search within a circular area.
   *
   * @return aroundLatLng
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Search for entries around a central geolocation, enabling a geo search within a circular" +
    " area."
  )
  public String getAroundLatLng() {
    return aroundLatLng;
  }

  public void setAroundLatLng(String aroundLatLng) {
    this.aroundLatLng = aroundLatLng;
  }

  public SearchParamsObject aroundLatLngViaIP(Boolean aroundLatLngViaIP) {
    this.aroundLatLngViaIP = aroundLatLngViaIP;
    return this;
  }

  /**
   * Search for entries around a given location automatically computed from the requester's IP
   * address.
   *
   * @return aroundLatLngViaIP
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Search for entries around a given location automatically computed from the requester's" +
    " IP address."
  )
  public Boolean getAroundLatLngViaIP() {
    return aroundLatLngViaIP;
  }

  public void setAroundLatLngViaIP(Boolean aroundLatLngViaIP) {
    this.aroundLatLngViaIP = aroundLatLngViaIP;
  }

  public SearchParamsObject aroundRadius(OneOfintegerstring aroundRadius) {
    this.aroundRadius = aroundRadius;
    return this;
  }

  /**
   * Define the maximum radius for a geo search (in meters).
   *
   * @return aroundRadius
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Define the maximum radius for a geo search (in meters)."
  )
  public OneOfintegerstring getAroundRadius() {
    return aroundRadius;
  }

  public void setAroundRadius(OneOfintegerstring aroundRadius) {
    this.aroundRadius = aroundRadius;
  }

  public SearchParamsObject aroundPrecision(Integer aroundPrecision) {
    this.aroundPrecision = aroundPrecision;
    return this;
  }

  /**
   * Precision of geo search (in meters), to add grouping by geo location to the ranking formula.
   *
   * @return aroundPrecision
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Precision of geo search (in meters), to add grouping by geo location to the ranking" +
    " formula."
  )
  public Integer getAroundPrecision() {
    return aroundPrecision;
  }

  public void setAroundPrecision(Integer aroundPrecision) {
    this.aroundPrecision = aroundPrecision;
  }

  public SearchParamsObject minimumAroundRadius(Integer minimumAroundRadius) {
    this.minimumAroundRadius = minimumAroundRadius;
    return this;
  }

  /**
   * Minimum radius (in meters) used for a geo search when aroundRadius is not set. minimum: 1
   *
   * @return minimumAroundRadius
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Minimum radius (in meters) used for a geo search when aroundRadius is not set."
  )
  public Integer getMinimumAroundRadius() {
    return minimumAroundRadius;
  }

  public void setMinimumAroundRadius(Integer minimumAroundRadius) {
    this.minimumAroundRadius = minimumAroundRadius;
  }

  public SearchParamsObject insideBoundingBox(
    List<BigDecimal> insideBoundingBox
  ) {
    this.insideBoundingBox = insideBoundingBox;
    return this;
  }

  public SearchParamsObject addInsideBoundingBoxItem(
    BigDecimal insideBoundingBoxItem
  ) {
    if (this.insideBoundingBox == null) {
      this.insideBoundingBox = new ArrayList<>();
    }
    this.insideBoundingBox.add(insideBoundingBoxItem);
    return this;
  }

  /**
   * Search inside a rectangular area (in geo coordinates).
   *
   * @return insideBoundingBox
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Search inside a rectangular area (in geo coordinates)."
  )
  public List<BigDecimal> getInsideBoundingBox() {
    return insideBoundingBox;
  }

  public void setInsideBoundingBox(List<BigDecimal> insideBoundingBox) {
    this.insideBoundingBox = insideBoundingBox;
  }

  public SearchParamsObject insidePolygon(List<BigDecimal> insidePolygon) {
    this.insidePolygon = insidePolygon;
    return this;
  }

  public SearchParamsObject addInsidePolygonItem(BigDecimal insidePolygonItem) {
    if (this.insidePolygon == null) {
      this.insidePolygon = new ArrayList<>();
    }
    this.insidePolygon.add(insidePolygonItem);
    return this;
  }

  /**
   * Search inside a polygon (in geo coordinates).
   *
   * @return insidePolygon
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Search inside a polygon (in geo coordinates).")
  public List<BigDecimal> getInsidePolygon() {
    return insidePolygon;
  }

  public void setInsidePolygon(List<BigDecimal> insidePolygon) {
    this.insidePolygon = insidePolygon;
  }

  public SearchParamsObject naturalLanguages(List<String> naturalLanguages) {
    this.naturalLanguages = naturalLanguages;
    return this;
  }

  public SearchParamsObject addNaturalLanguagesItem(
    String naturalLanguagesItem
  ) {
    if (this.naturalLanguages == null) {
      this.naturalLanguages = new ArrayList<>();
    }
    this.naturalLanguages.add(naturalLanguagesItem);
    return this;
  }

  /**
   * This parameter changes the default values of certain parameters and settings that work best for
   * a natural language query, such as ignorePlurals, removeStopWords, removeWordsIfNoResults,
   * analyticsTags and ruleContexts. These parameters and settings work well together when the query
   * is formatted in natural language instead of keywords, for example when your user performs a
   * voice search.
   *
   * @return naturalLanguages
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "This parameter changes the default values of certain parameters and settings that work" +
    " best for a natural language query, such as ignorePlurals, removeStopWords," +
    " removeWordsIfNoResults, analyticsTags and ruleContexts. These parameters and" +
    " settings work well together when the query is formatted in natural language" +
    " instead of keywords, for example when your user performs a voice search."
  )
  public List<String> getNaturalLanguages() {
    return naturalLanguages;
  }

  public void setNaturalLanguages(List<String> naturalLanguages) {
    this.naturalLanguages = naturalLanguages;
  }

  public SearchParamsObject ruleContexts(List<String> ruleContexts) {
    this.ruleContexts = ruleContexts;
    return this;
  }

  public SearchParamsObject addRuleContextsItem(String ruleContextsItem) {
    if (this.ruleContexts == null) {
      this.ruleContexts = new ArrayList<>();
    }
    this.ruleContexts.add(ruleContextsItem);
    return this;
  }

  /**
   * Enables contextual rules.
   *
   * @return ruleContexts
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Enables contextual rules.")
  public List<String> getRuleContexts() {
    return ruleContexts;
  }

  public void setRuleContexts(List<String> ruleContexts) {
    this.ruleContexts = ruleContexts;
  }

  public SearchParamsObject personalizationImpact(
    Integer personalizationImpact
  ) {
    this.personalizationImpact = personalizationImpact;
    return this;
  }

  /**
   * Define the impact of the Personalization feature.
   *
   * @return personalizationImpact
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Define the impact of the Personalization feature.")
  public Integer getPersonalizationImpact() {
    return personalizationImpact;
  }

  public void setPersonalizationImpact(Integer personalizationImpact) {
    this.personalizationImpact = personalizationImpact;
  }

  public SearchParamsObject userToken(String userToken) {
    this.userToken = userToken;
    return this;
  }

  /**
   * Associates a certain user token with the current search.
   *
   * @return userToken
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Associates a certain user token with the current search."
  )
  public String getUserToken() {
    return userToken;
  }

  public void setUserToken(String userToken) {
    this.userToken = userToken;
  }

  public SearchParamsObject getRankingInfo(Boolean getRankingInfo) {
    this.getRankingInfo = getRankingInfo;
    return this;
  }

  /**
   * Retrieve detailed ranking information.
   *
   * @return getRankingInfo
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Retrieve detailed ranking information.")
  public Boolean getGetRankingInfo() {
    return getRankingInfo;
  }

  public void setGetRankingInfo(Boolean getRankingInfo) {
    this.getRankingInfo = getRankingInfo;
  }

  public SearchParamsObject clickAnalytics(Boolean clickAnalytics) {
    this.clickAnalytics = clickAnalytics;
    return this;
  }

  /**
   * Enable the Click Analytics feature.
   *
   * @return clickAnalytics
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Enable the Click Analytics feature.")
  public Boolean getClickAnalytics() {
    return clickAnalytics;
  }

  public void setClickAnalytics(Boolean clickAnalytics) {
    this.clickAnalytics = clickAnalytics;
  }

  public SearchParamsObject analytics(Boolean analytics) {
    this.analytics = analytics;
    return this;
  }

  /**
   * Whether the current query will be taken into account in the Analytics.
   *
   * @return analytics
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether the current query will be taken into account in the Analytics."
  )
  public Boolean getAnalytics() {
    return analytics;
  }

  public void setAnalytics(Boolean analytics) {
    this.analytics = analytics;
  }

  public SearchParamsObject analyticsTags(List<String> analyticsTags) {
    this.analyticsTags = analyticsTags;
    return this;
  }

  public SearchParamsObject addAnalyticsTagsItem(String analyticsTagsItem) {
    if (this.analyticsTags == null) {
      this.analyticsTags = new ArrayList<>();
    }
    this.analyticsTags.add(analyticsTagsItem);
    return this;
  }

  /**
   * List of tags to apply to the query for analytics purposes.
   *
   * @return analyticsTags
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "List of tags to apply to the query for analytics purposes."
  )
  public List<String> getAnalyticsTags() {
    return analyticsTags;
  }

  public void setAnalyticsTags(List<String> analyticsTags) {
    this.analyticsTags = analyticsTags;
  }

  public SearchParamsObject percentileComputation(
    Boolean percentileComputation
  ) {
    this.percentileComputation = percentileComputation;
    return this;
  }

  /**
   * Whether to include or exclude a query from the processing-time percentile computation.
   *
   * @return percentileComputation
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether to include or exclude a query from the processing-time percentile computation."
  )
  public Boolean getPercentileComputation() {
    return percentileComputation;
  }

  public void setPercentileComputation(Boolean percentileComputation) {
    this.percentileComputation = percentileComputation;
  }

  public SearchParamsObject enableABTest(Boolean enableABTest) {
    this.enableABTest = enableABTest;
    return this;
  }

  /**
   * Whether this search should participate in running AB tests.
   *
   * @return enableABTest
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether this search should participate in running AB tests."
  )
  public Boolean getEnableABTest() {
    return enableABTest;
  }

  public void setEnableABTest(Boolean enableABTest) {
    this.enableABTest = enableABTest;
  }

  public SearchParamsObject enableReRanking(Boolean enableReRanking) {
    this.enableReRanking = enableReRanking;
    return this;
  }

  /**
   * Whether this search should use AI Re-Ranking.
   *
   * @return enableReRanking
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Whether this search should use AI Re-Ranking.")
  public Boolean getEnableReRanking() {
    return enableReRanking;
  }

  public void setEnableReRanking(Boolean enableReRanking) {
    this.enableReRanking = enableReRanking;
  }

  public SearchParamsObject searchableAttributes(
    List<String> searchableAttributes
  ) {
    this.searchableAttributes = searchableAttributes;
    return this;
  }

  public SearchParamsObject addSearchableAttributesItem(
    String searchableAttributesItem
  ) {
    if (this.searchableAttributes == null) {
      this.searchableAttributes = new ArrayList<>();
    }
    this.searchableAttributes.add(searchableAttributesItem);
    return this;
  }

  /**
   * The complete list of attributes used for searching.
   *
   * @return searchableAttributes
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "The complete list of attributes used for searching."
  )
  public List<String> getSearchableAttributes() {
    return searchableAttributes;
  }

  public void setSearchableAttributes(List<String> searchableAttributes) {
    this.searchableAttributes = searchableAttributes;
  }

  public SearchParamsObject attributesForFaceting(
    List<String> attributesForFaceting
  ) {
    this.attributesForFaceting = attributesForFaceting;
    return this;
  }

  public SearchParamsObject addAttributesForFacetingItem(
    String attributesForFacetingItem
  ) {
    if (this.attributesForFaceting == null) {
      this.attributesForFaceting = new ArrayList<>();
    }
    this.attributesForFaceting.add(attributesForFacetingItem);
    return this;
  }

  /**
   * The complete list of attributes that will be used for faceting.
   *
   * @return attributesForFaceting
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "The complete list of attributes that will be used for faceting."
  )
  public List<String> getAttributesForFaceting() {
    return attributesForFaceting;
  }

  public void setAttributesForFaceting(List<String> attributesForFaceting) {
    this.attributesForFaceting = attributesForFaceting;
  }

  public SearchParamsObject unretrievableAttributes(
    List<String> unretrievableAttributes
  ) {
    this.unretrievableAttributes = unretrievableAttributes;
    return this;
  }

  public SearchParamsObject addUnretrievableAttributesItem(
    String unretrievableAttributesItem
  ) {
    if (this.unretrievableAttributes == null) {
      this.unretrievableAttributes = new ArrayList<>();
    }
    this.unretrievableAttributes.add(unretrievableAttributesItem);
    return this;
  }

  /**
   * List of attributes that can't be retrieved at query time.
   *
   * @return unretrievableAttributes
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "List of attributes that can't be retrieved at query time."
  )
  public List<String> getUnretrievableAttributes() {
    return unretrievableAttributes;
  }

  public void setUnretrievableAttributes(List<String> unretrievableAttributes) {
    this.unretrievableAttributes = unretrievableAttributes;
  }

  public SearchParamsObject attributesToRetrieve(
    List<String> attributesToRetrieve
  ) {
    this.attributesToRetrieve = attributesToRetrieve;
    return this;
  }

  public SearchParamsObject addAttributesToRetrieveItem(
    String attributesToRetrieveItem
  ) {
    if (this.attributesToRetrieve == null) {
      this.attributesToRetrieve = new ArrayList<>();
    }
    this.attributesToRetrieve.add(attributesToRetrieveItem);
    return this;
  }

  /**
   * This parameter controls which attributes to retrieve and which not to retrieve.
   *
   * @return attributesToRetrieve
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "This parameter controls which attributes to retrieve and which not to retrieve."
  )
  public List<String> getAttributesToRetrieve() {
    return attributesToRetrieve;
  }

  public void setAttributesToRetrieve(List<String> attributesToRetrieve) {
    this.attributesToRetrieve = attributesToRetrieve;
  }

  public SearchParamsObject restrictSearchableAttributes(
    List<String> restrictSearchableAttributes
  ) {
    this.restrictSearchableAttributes = restrictSearchableAttributes;
    return this;
  }

  public SearchParamsObject addRestrictSearchableAttributesItem(
    String restrictSearchableAttributesItem
  ) {
    if (this.restrictSearchableAttributes == null) {
      this.restrictSearchableAttributes = new ArrayList<>();
    }
    this.restrictSearchableAttributes.add(restrictSearchableAttributesItem);
    return this;
  }

  /**
   * Restricts a given query to look in only a subset of your searchable attributes.
   *
   * @return restrictSearchableAttributes
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Restricts a given query to look in only a subset of your searchable attributes."
  )
  public List<String> getRestrictSearchableAttributes() {
    return restrictSearchableAttributes;
  }

  public void setRestrictSearchableAttributes(
    List<String> restrictSearchableAttributes
  ) {
    this.restrictSearchableAttributes = restrictSearchableAttributes;
  }

  public SearchParamsObject ranking(List<String> ranking) {
    this.ranking = ranking;
    return this;
  }

  public SearchParamsObject addRankingItem(String rankingItem) {
    if (this.ranking == null) {
      this.ranking = new ArrayList<>();
    }
    this.ranking.add(rankingItem);
    return this;
  }

  /**
   * Controls how Algolia should sort your results.
   *
   * @return ranking
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Controls how Algolia should sort your results.")
  public List<String> getRanking() {
    return ranking;
  }

  public void setRanking(List<String> ranking) {
    this.ranking = ranking;
  }

  public SearchParamsObject customRanking(List<String> customRanking) {
    this.customRanking = customRanking;
    return this;
  }

  public SearchParamsObject addCustomRankingItem(String customRankingItem) {
    if (this.customRanking == null) {
      this.customRanking = new ArrayList<>();
    }
    this.customRanking.add(customRankingItem);
    return this;
  }

  /**
   * Specifies the custom ranking criterion.
   *
   * @return customRanking
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Specifies the custom ranking criterion.")
  public List<String> getCustomRanking() {
    return customRanking;
  }

  public void setCustomRanking(List<String> customRanking) {
    this.customRanking = customRanking;
  }

  public SearchParamsObject relevancyStrictness(Integer relevancyStrictness) {
    this.relevancyStrictness = relevancyStrictness;
    return this;
  }

  /**
   * Controls the relevancy threshold below which less relevant results aren't included in the
   * results.
   *
   * @return relevancyStrictness
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Controls the relevancy threshold below which less relevant results aren't included in" +
    " the results."
  )
  public Integer getRelevancyStrictness() {
    return relevancyStrictness;
  }

  public void setRelevancyStrictness(Integer relevancyStrictness) {
    this.relevancyStrictness = relevancyStrictness;
  }

  public SearchParamsObject attributesToHighlight(
    List<String> attributesToHighlight
  ) {
    this.attributesToHighlight = attributesToHighlight;
    return this;
  }

  public SearchParamsObject addAttributesToHighlightItem(
    String attributesToHighlightItem
  ) {
    if (this.attributesToHighlight == null) {
      this.attributesToHighlight = new ArrayList<>();
    }
    this.attributesToHighlight.add(attributesToHighlightItem);
    return this;
  }

  /**
   * List of attributes to highlight.
   *
   * @return attributesToHighlight
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "List of attributes to highlight.")
  public List<String> getAttributesToHighlight() {
    return attributesToHighlight;
  }

  public void setAttributesToHighlight(List<String> attributesToHighlight) {
    this.attributesToHighlight = attributesToHighlight;
  }

  public SearchParamsObject attributesToSnippet(
    List<String> attributesToSnippet
  ) {
    this.attributesToSnippet = attributesToSnippet;
    return this;
  }

  public SearchParamsObject addAttributesToSnippetItem(
    String attributesToSnippetItem
  ) {
    if (this.attributesToSnippet == null) {
      this.attributesToSnippet = new ArrayList<>();
    }
    this.attributesToSnippet.add(attributesToSnippetItem);
    return this;
  }

  /**
   * List of attributes to snippet, with an optional maximum number of words to snippet.
   *
   * @return attributesToSnippet
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "List of attributes to snippet, with an optional maximum number of words to snippet."
  )
  public List<String> getAttributesToSnippet() {
    return attributesToSnippet;
  }

  public void setAttributesToSnippet(List<String> attributesToSnippet) {
    this.attributesToSnippet = attributesToSnippet;
  }

  public SearchParamsObject highlightPreTag(String highlightPreTag) {
    this.highlightPreTag = highlightPreTag;
    return this;
  }

  /**
   * The HTML string to insert before the highlighted parts in all highlight and snippet results.
   *
   * @return highlightPreTag
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "The HTML string to insert before the highlighted parts in all highlight and snippet" +
    " results."
  )
  public String getHighlightPreTag() {
    return highlightPreTag;
  }

  public void setHighlightPreTag(String highlightPreTag) {
    this.highlightPreTag = highlightPreTag;
  }

  public SearchParamsObject highlightPostTag(String highlightPostTag) {
    this.highlightPostTag = highlightPostTag;
    return this;
  }

  /**
   * The HTML string to insert after the highlighted parts in all highlight and snippet results.
   *
   * @return highlightPostTag
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "The HTML string to insert after the highlighted parts in all highlight and snippet" +
    " results."
  )
  public String getHighlightPostTag() {
    return highlightPostTag;
  }

  public void setHighlightPostTag(String highlightPostTag) {
    this.highlightPostTag = highlightPostTag;
  }

  public SearchParamsObject snippetEllipsisText(String snippetEllipsisText) {
    this.snippetEllipsisText = snippetEllipsisText;
    return this;
  }

  /**
   * String used as an ellipsis indicator when a snippet is truncated.
   *
   * @return snippetEllipsisText
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "String used as an ellipsis indicator when a snippet is truncated."
  )
  public String getSnippetEllipsisText() {
    return snippetEllipsisText;
  }

  public void setSnippetEllipsisText(String snippetEllipsisText) {
    this.snippetEllipsisText = snippetEllipsisText;
  }

  public SearchParamsObject restrictHighlightAndSnippetArrays(
    Boolean restrictHighlightAndSnippetArrays
  ) {
    this.restrictHighlightAndSnippetArrays = restrictHighlightAndSnippetArrays;
    return this;
  }

  /**
   * Restrict highlighting and snippeting to items that matched the query.
   *
   * @return restrictHighlightAndSnippetArrays
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Restrict highlighting and snippeting to items that matched the query."
  )
  public Boolean getRestrictHighlightAndSnippetArrays() {
    return restrictHighlightAndSnippetArrays;
  }

  public void setRestrictHighlightAndSnippetArrays(
    Boolean restrictHighlightAndSnippetArrays
  ) {
    this.restrictHighlightAndSnippetArrays = restrictHighlightAndSnippetArrays;
  }

  public SearchParamsObject hitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Set the number of hits per page.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Set the number of hits per page.")
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public void setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
  }

  public SearchParamsObject minWordSizefor1Typo(Integer minWordSizefor1Typo) {
    this.minWordSizefor1Typo = minWordSizefor1Typo;
    return this;
  }

  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 1
   * typo.
   *
   * @return minWordSizefor1Typo
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Minimum number of characters a word in the query string must contain to accept matches" +
    " with 1 typo."
  )
  public Integer getMinWordSizefor1Typo() {
    return minWordSizefor1Typo;
  }

  public void setMinWordSizefor1Typo(Integer minWordSizefor1Typo) {
    this.minWordSizefor1Typo = minWordSizefor1Typo;
  }

  public SearchParamsObject minWordSizefor2Typos(Integer minWordSizefor2Typos) {
    this.minWordSizefor2Typos = minWordSizefor2Typos;
    return this;
  }

  /**
   * Minimum number of characters a word in the query string must contain to accept matches with 2
   * typos.
   *
   * @return minWordSizefor2Typos
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Minimum number of characters a word in the query string must contain to accept matches" +
    " with 2 typos."
  )
  public Integer getMinWordSizefor2Typos() {
    return minWordSizefor2Typos;
  }

  public void setMinWordSizefor2Typos(Integer minWordSizefor2Typos) {
    this.minWordSizefor2Typos = minWordSizefor2Typos;
  }

  public SearchParamsObject typoTolerance(TypoToleranceEnum typoTolerance) {
    this.typoTolerance = typoTolerance;
    return this;
  }

  /**
   * Controls whether typo tolerance is enabled and how it is applied.
   *
   * @return typoTolerance
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Controls whether typo tolerance is enabled and how it is applied."
  )
  public TypoToleranceEnum getTypoTolerance() {
    return typoTolerance;
  }

  public void setTypoTolerance(TypoToleranceEnum typoTolerance) {
    this.typoTolerance = typoTolerance;
  }

  public SearchParamsObject allowTyposOnNumericTokens(
    Boolean allowTyposOnNumericTokens
  ) {
    this.allowTyposOnNumericTokens = allowTyposOnNumericTokens;
    return this;
  }

  /**
   * Whether to allow typos on numbers (\"numeric tokens\") in the query string.
   *
   * @return allowTyposOnNumericTokens
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether to allow typos on numbers (\"numeric tokens\") in the query string."
  )
  public Boolean getAllowTyposOnNumericTokens() {
    return allowTyposOnNumericTokens;
  }

  public void setAllowTyposOnNumericTokens(Boolean allowTyposOnNumericTokens) {
    this.allowTyposOnNumericTokens = allowTyposOnNumericTokens;
  }

  public SearchParamsObject disableTypoToleranceOnAttributes(
    List<String> disableTypoToleranceOnAttributes
  ) {
    this.disableTypoToleranceOnAttributes = disableTypoToleranceOnAttributes;
    return this;
  }

  public SearchParamsObject addDisableTypoToleranceOnAttributesItem(
    String disableTypoToleranceOnAttributesItem
  ) {
    if (this.disableTypoToleranceOnAttributes == null) {
      this.disableTypoToleranceOnAttributes = new ArrayList<>();
    }
    this.disableTypoToleranceOnAttributes.add(
        disableTypoToleranceOnAttributesItem
      );
    return this;
  }

  /**
   * List of attributes on which you want to disable typo tolerance.
   *
   * @return disableTypoToleranceOnAttributes
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "List of attributes on which you want to disable typo tolerance."
  )
  public List<String> getDisableTypoToleranceOnAttributes() {
    return disableTypoToleranceOnAttributes;
  }

  public void setDisableTypoToleranceOnAttributes(
    List<String> disableTypoToleranceOnAttributes
  ) {
    this.disableTypoToleranceOnAttributes = disableTypoToleranceOnAttributes;
  }

  public SearchParamsObject separatorsToIndex(String separatorsToIndex) {
    this.separatorsToIndex = separatorsToIndex;
    return this;
  }

  /**
   * Control which separators are indexed.
   *
   * @return separatorsToIndex
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Control which separators are indexed.")
  public String getSeparatorsToIndex() {
    return separatorsToIndex;
  }

  public void setSeparatorsToIndex(String separatorsToIndex) {
    this.separatorsToIndex = separatorsToIndex;
  }

  public SearchParamsObject ignorePlurals(String ignorePlurals) {
    this.ignorePlurals = ignorePlurals;
    return this;
  }

  /**
   * Treats singular, plurals, and other forms of declensions as matching terms.
   *
   * @return ignorePlurals
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Treats singular, plurals, and other forms of declensions as matching terms."
  )
  public String getIgnorePlurals() {
    return ignorePlurals;
  }

  public void setIgnorePlurals(String ignorePlurals) {
    this.ignorePlurals = ignorePlurals;
  }

  public SearchParamsObject removeStopWords(String removeStopWords) {
    this.removeStopWords = removeStopWords;
    return this;
  }

  /**
   * Removes stop (common) words from the query before executing it.
   *
   * @return removeStopWords
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Removes stop (common) words from the query before executing it."
  )
  public String getRemoveStopWords() {
    return removeStopWords;
  }

  public void setRemoveStopWords(String removeStopWords) {
    this.removeStopWords = removeStopWords;
  }

  public SearchParamsObject keepDiacriticsOnCharacters(
    String keepDiacriticsOnCharacters
  ) {
    this.keepDiacriticsOnCharacters = keepDiacriticsOnCharacters;
    return this;
  }

  /**
   * List of characters that the engine shouldn't automatically normalize.
   *
   * @return keepDiacriticsOnCharacters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "List of characters that the engine shouldn't automatically normalize."
  )
  public String getKeepDiacriticsOnCharacters() {
    return keepDiacriticsOnCharacters;
  }

  public void setKeepDiacriticsOnCharacters(String keepDiacriticsOnCharacters) {
    this.keepDiacriticsOnCharacters = keepDiacriticsOnCharacters;
  }

  public SearchParamsObject queryLanguages(List<String> queryLanguages) {
    this.queryLanguages = queryLanguages;
    return this;
  }

  public SearchParamsObject addQueryLanguagesItem(String queryLanguagesItem) {
    if (this.queryLanguages == null) {
      this.queryLanguages = new ArrayList<>();
    }
    this.queryLanguages.add(queryLanguagesItem);
    return this;
  }

  /**
   * Sets the languages to be used by language-specific settings and functionalities such as
   * ignorePlurals, removeStopWords, and CJK word-detection.
   *
   * @return queryLanguages
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Sets the languages to be used by language-specific settings and functionalities such as" +
    " ignorePlurals, removeStopWords, and CJK word-detection."
  )
  public List<String> getQueryLanguages() {
    return queryLanguages;
  }

  public void setQueryLanguages(List<String> queryLanguages) {
    this.queryLanguages = queryLanguages;
  }

  public SearchParamsObject decompoundQuery(Boolean decompoundQuery) {
    this.decompoundQuery = decompoundQuery;
    return this;
  }

  /**
   * Splits compound words into their composing atoms in the query.
   *
   * @return decompoundQuery
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Splits compound words into their composing atoms in the query."
  )
  public Boolean getDecompoundQuery() {
    return decompoundQuery;
  }

  public void setDecompoundQuery(Boolean decompoundQuery) {
    this.decompoundQuery = decompoundQuery;
  }

  public SearchParamsObject enableRules(Boolean enableRules) {
    this.enableRules = enableRules;
    return this;
  }

  /**
   * Whether Rules should be globally enabled.
   *
   * @return enableRules
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Whether Rules should be globally enabled.")
  public Boolean getEnableRules() {
    return enableRules;
  }

  public void setEnableRules(Boolean enableRules) {
    this.enableRules = enableRules;
  }

  public SearchParamsObject enablePersonalization(
    Boolean enablePersonalization
  ) {
    this.enablePersonalization = enablePersonalization;
    return this;
  }

  /**
   * Enable the Personalization feature.
   *
   * @return enablePersonalization
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Enable the Personalization feature.")
  public Boolean getEnablePersonalization() {
    return enablePersonalization;
  }

  public void setEnablePersonalization(Boolean enablePersonalization) {
    this.enablePersonalization = enablePersonalization;
  }

  public SearchParamsObject queryType(QueryTypeEnum queryType) {
    this.queryType = queryType;
    return this;
  }

  /**
   * Controls if and how query words are interpreted as prefixes.
   *
   * @return queryType
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Controls if and how query words are interpreted as prefixes."
  )
  public QueryTypeEnum getQueryType() {
    return queryType;
  }

  public void setQueryType(QueryTypeEnum queryType) {
    this.queryType = queryType;
  }

  public SearchParamsObject removeWordsIfNoResults(
    RemoveWordsIfNoResultsEnum removeWordsIfNoResults
  ) {
    this.removeWordsIfNoResults = removeWordsIfNoResults;
    return this;
  }

  /**
   * Selects a strategy to remove words from the query when it doesn't match any hits.
   *
   * @return removeWordsIfNoResults
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Selects a strategy to remove words from the query when it doesn't match any hits."
  )
  public RemoveWordsIfNoResultsEnum getRemoveWordsIfNoResults() {
    return removeWordsIfNoResults;
  }

  public void setRemoveWordsIfNoResults(
    RemoveWordsIfNoResultsEnum removeWordsIfNoResults
  ) {
    this.removeWordsIfNoResults = removeWordsIfNoResults;
  }

  public SearchParamsObject advancedSyntax(Boolean advancedSyntax) {
    this.advancedSyntax = advancedSyntax;
    return this;
  }

  /**
   * Enables the advanced query syntax.
   *
   * @return advancedSyntax
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Enables the advanced query syntax.")
  public Boolean getAdvancedSyntax() {
    return advancedSyntax;
  }

  public void setAdvancedSyntax(Boolean advancedSyntax) {
    this.advancedSyntax = advancedSyntax;
  }

  public SearchParamsObject optionalWords(List<String> optionalWords) {
    this.optionalWords = optionalWords;
    return this;
  }

  public SearchParamsObject addOptionalWordsItem(String optionalWordsItem) {
    if (this.optionalWords == null) {
      this.optionalWords = new ArrayList<>();
    }
    this.optionalWords.add(optionalWordsItem);
    return this;
  }

  /**
   * A list of words that should be considered as optional when found in the query.
   *
   * @return optionalWords
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "A list of words that should be considered as optional when found in the query."
  )
  public List<String> getOptionalWords() {
    return optionalWords;
  }

  public void setOptionalWords(List<String> optionalWords) {
    this.optionalWords = optionalWords;
  }

  public SearchParamsObject disableExactOnAttributes(
    List<String> disableExactOnAttributes
  ) {
    this.disableExactOnAttributes = disableExactOnAttributes;
    return this;
  }

  public SearchParamsObject addDisableExactOnAttributesItem(
    String disableExactOnAttributesItem
  ) {
    if (this.disableExactOnAttributes == null) {
      this.disableExactOnAttributes = new ArrayList<>();
    }
    this.disableExactOnAttributes.add(disableExactOnAttributesItem);
    return this;
  }

  /**
   * List of attributes on which you want to disable the exact ranking criterion.
   *
   * @return disableExactOnAttributes
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "List of attributes on which you want to disable the exact ranking criterion."
  )
  public List<String> getDisableExactOnAttributes() {
    return disableExactOnAttributes;
  }

  public void setDisableExactOnAttributes(
    List<String> disableExactOnAttributes
  ) {
    this.disableExactOnAttributes = disableExactOnAttributes;
  }

  public SearchParamsObject exactOnSingleWordQuery(
    ExactOnSingleWordQueryEnum exactOnSingleWordQuery
  ) {
    this.exactOnSingleWordQuery = exactOnSingleWordQuery;
    return this;
  }

  /**
   * Controls how the exact ranking criterion is computed when the query contains only one word.
   *
   * @return exactOnSingleWordQuery
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Controls how the exact ranking criterion is computed when the query contains only one" +
    " word."
  )
  public ExactOnSingleWordQueryEnum getExactOnSingleWordQuery() {
    return exactOnSingleWordQuery;
  }

  public void setExactOnSingleWordQuery(
    ExactOnSingleWordQueryEnum exactOnSingleWordQuery
  ) {
    this.exactOnSingleWordQuery = exactOnSingleWordQuery;
  }

  public SearchParamsObject alternativesAsExact(
    List<AlternativesAsExactEnum> alternativesAsExact
  ) {
    this.alternativesAsExact = alternativesAsExact;
    return this;
  }

  public SearchParamsObject addAlternativesAsExactItem(
    AlternativesAsExactEnum alternativesAsExactItem
  ) {
    if (this.alternativesAsExact == null) {
      this.alternativesAsExact = new ArrayList<>();
    }
    this.alternativesAsExact.add(alternativesAsExactItem);
    return this;
  }

  /**
   * List of alternatives that should be considered an exact match by the exact ranking criterion.
   *
   * @return alternativesAsExact
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "List of alternatives that should be considered an exact match by the exact ranking" +
    " criterion."
  )
  public List<AlternativesAsExactEnum> getAlternativesAsExact() {
    return alternativesAsExact;
  }

  public void setAlternativesAsExact(
    List<AlternativesAsExactEnum> alternativesAsExact
  ) {
    this.alternativesAsExact = alternativesAsExact;
  }

  public SearchParamsObject advancedSyntaxFeatures(
    List<AdvancedSyntaxFeaturesEnum> advancedSyntaxFeatures
  ) {
    this.advancedSyntaxFeatures = advancedSyntaxFeatures;
    return this;
  }

  public SearchParamsObject addAdvancedSyntaxFeaturesItem(
    AdvancedSyntaxFeaturesEnum advancedSyntaxFeaturesItem
  ) {
    if (this.advancedSyntaxFeatures == null) {
      this.advancedSyntaxFeatures = new ArrayList<>();
    }
    this.advancedSyntaxFeatures.add(advancedSyntaxFeaturesItem);
    return this;
  }

  /**
   * Allows you to specify which advanced syntax features are active when ‘advancedSyntax' is
   * enabled.
   *
   * @return advancedSyntaxFeatures
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Allows you to specify which advanced syntax features are active when ‘advancedSyntax' is" +
    " enabled."
  )
  public List<AdvancedSyntaxFeaturesEnum> getAdvancedSyntaxFeatures() {
    return advancedSyntaxFeatures;
  }

  public void setAdvancedSyntaxFeatures(
    List<AdvancedSyntaxFeaturesEnum> advancedSyntaxFeatures
  ) {
    this.advancedSyntaxFeatures = advancedSyntaxFeatures;
  }

  public SearchParamsObject distinct(Integer distinct) {
    this.distinct = distinct;
    return this;
  }

  /**
   * Enables de-duplication or grouping of results. minimum: 0 maximum: 4
   *
   * @return distinct
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Enables de-duplication or grouping of results.")
  public Integer getDistinct() {
    return distinct;
  }

  public void setDistinct(Integer distinct) {
    this.distinct = distinct;
  }

  public SearchParamsObject synonyms(Boolean synonyms) {
    this.synonyms = synonyms;
    return this;
  }

  /**
   * Whether to take into account an index's synonyms for a particular search.
   *
   * @return synonyms
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether to take into account an index's synonyms for a particular search."
  )
  public Boolean getSynonyms() {
    return synonyms;
  }

  public void setSynonyms(Boolean synonyms) {
    this.synonyms = synonyms;
  }

  public SearchParamsObject replaceSynonymsInHighlight(
    Boolean replaceSynonymsInHighlight
  ) {
    this.replaceSynonymsInHighlight = replaceSynonymsInHighlight;
    return this;
  }

  /**
   * Whether to highlight and snippet the original word that matches the synonym or the synonym
   * itself.
   *
   * @return replaceSynonymsInHighlight
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Whether to highlight and snippet the original word that matches the synonym or the" +
    " synonym itself."
  )
  public Boolean getReplaceSynonymsInHighlight() {
    return replaceSynonymsInHighlight;
  }

  public void setReplaceSynonymsInHighlight(
    Boolean replaceSynonymsInHighlight
  ) {
    this.replaceSynonymsInHighlight = replaceSynonymsInHighlight;
  }

  public SearchParamsObject minProximity(Integer minProximity) {
    this.minProximity = minProximity;
    return this;
  }

  /**
   * Precision of the proximity ranking criterion. minimum: 1 maximum: 7
   *
   * @return minProximity
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Precision of the proximity ranking criterion.")
  public Integer getMinProximity() {
    return minProximity;
  }

  public void setMinProximity(Integer minProximity) {
    this.minProximity = minProximity;
  }

  public SearchParamsObject responseFields(List<String> responseFields) {
    this.responseFields = responseFields;
    return this;
  }

  public SearchParamsObject addResponseFieldsItem(String responseFieldsItem) {
    if (this.responseFields == null) {
      this.responseFields = new ArrayList<>();
    }
    this.responseFields.add(responseFieldsItem);
    return this;
  }

  /**
   * Choose which fields to return in the API response. This parameters applies to search and browse
   * queries.
   *
   * @return responseFields
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Choose which fields to return in the API response. This parameters applies to search and" +
    " browse queries."
  )
  public List<String> getResponseFields() {
    return responseFields;
  }

  public void setResponseFields(List<String> responseFields) {
    this.responseFields = responseFields;
  }

  public SearchParamsObject maxFacetHits(Integer maxFacetHits) {
    this.maxFacetHits = maxFacetHits;
    return this;
  }

  /**
   * Maximum number of facet hits to return during a search for facet values. For performance
   * reasons, the maximum allowed number of returned values is 100. maximum: 100
   *
   * @return maxFacetHits
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Maximum number of facet hits to return during a search for facet values. For performance" +
    " reasons, the maximum allowed number of returned values is 100."
  )
  public Integer getMaxFacetHits() {
    return maxFacetHits;
  }

  public void setMaxFacetHits(Integer maxFacetHits) {
    this.maxFacetHits = maxFacetHits;
  }

  public SearchParamsObject attributeCriteriaComputedByMinProximity(
    Boolean attributeCriteriaComputedByMinProximity
  ) {
    this.attributeCriteriaComputedByMinProximity =
      attributeCriteriaComputedByMinProximity;
    return this;
  }

  /**
   * When attribute is ranked above proximity in your ranking formula, proximity is used to select
   * which searchable attribute is matched in the attribute ranking stage.
   *
   * @return attributeCriteriaComputedByMinProximity
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "When attribute is ranked above proximity in your ranking formula, proximity is used to" +
    " select which searchable attribute is matched in the attribute ranking stage."
  )
  public Boolean getAttributeCriteriaComputedByMinProximity() {
    return attributeCriteriaComputedByMinProximity;
  }

  public void setAttributeCriteriaComputedByMinProximity(
    Boolean attributeCriteriaComputedByMinProximity
  ) {
    this.attributeCriteriaComputedByMinProximity =
      attributeCriteriaComputedByMinProximity;
  }

  public SearchParamsObject renderingContent(Object renderingContent) {
    this.renderingContent = renderingContent;
    return this;
  }

  /**
   * Content defining how the search interface should be rendered. Can be set via the settings for a
   * default value and can be overridden via rules.
   *
   * @return renderingContent
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Content defining how the search interface should be rendered. Can be set via the" +
    " settings for a default value and can be overridden via rules."
  )
  public Object getRenderingContent() {
    return renderingContent;
  }

  public void setRenderingContent(Object renderingContent) {
    this.renderingContent = renderingContent;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchParamsObject searchParamsObject = (SearchParamsObject) o;
    return (
      Objects.equals(this.query, searchParamsObject.query) &&
      Objects.equals(this.similarQuery, searchParamsObject.similarQuery) &&
      Objects.equals(this.filters, searchParamsObject.filters) &&
      Objects.equals(this.facetFilters, searchParamsObject.facetFilters) &&
      Objects.equals(
        this.optionalFilters,
        searchParamsObject.optionalFilters
      ) &&
      Objects.equals(this.numericFilters, searchParamsObject.numericFilters) &&
      Objects.equals(this.tagFilters, searchParamsObject.tagFilters) &&
      Objects.equals(
        this.sumOrFiltersScores,
        searchParamsObject.sumOrFiltersScores
      ) &&
      Objects.equals(this.facets, searchParamsObject.facets) &&
      Objects.equals(
        this.maxValuesPerFacet,
        searchParamsObject.maxValuesPerFacet
      ) &&
      Objects.equals(
        this.facetingAfterDistinct,
        searchParamsObject.facetingAfterDistinct
      ) &&
      Objects.equals(
        this.sortFacetValuesBy,
        searchParamsObject.sortFacetValuesBy
      ) &&
      Objects.equals(this.page, searchParamsObject.page) &&
      Objects.equals(this.offset, searchParamsObject.offset) &&
      Objects.equals(this.length, searchParamsObject.length) &&
      Objects.equals(this.aroundLatLng, searchParamsObject.aroundLatLng) &&
      Objects.equals(
        this.aroundLatLngViaIP,
        searchParamsObject.aroundLatLngViaIP
      ) &&
      Objects.equals(this.aroundRadius, searchParamsObject.aroundRadius) &&
      Objects.equals(
        this.aroundPrecision,
        searchParamsObject.aroundPrecision
      ) &&
      Objects.equals(
        this.minimumAroundRadius,
        searchParamsObject.minimumAroundRadius
      ) &&
      Objects.equals(
        this.insideBoundingBox,
        searchParamsObject.insideBoundingBox
      ) &&
      Objects.equals(this.insidePolygon, searchParamsObject.insidePolygon) &&
      Objects.equals(
        this.naturalLanguages,
        searchParamsObject.naturalLanguages
      ) &&
      Objects.equals(this.ruleContexts, searchParamsObject.ruleContexts) &&
      Objects.equals(
        this.personalizationImpact,
        searchParamsObject.personalizationImpact
      ) &&
      Objects.equals(this.userToken, searchParamsObject.userToken) &&
      Objects.equals(this.getRankingInfo, searchParamsObject.getRankingInfo) &&
      Objects.equals(this.clickAnalytics, searchParamsObject.clickAnalytics) &&
      Objects.equals(this.analytics, searchParamsObject.analytics) &&
      Objects.equals(this.analyticsTags, searchParamsObject.analyticsTags) &&
      Objects.equals(
        this.percentileComputation,
        searchParamsObject.percentileComputation
      ) &&
      Objects.equals(this.enableABTest, searchParamsObject.enableABTest) &&
      Objects.equals(
        this.enableReRanking,
        searchParamsObject.enableReRanking
      ) &&
      Objects.equals(
        this.searchableAttributes,
        searchParamsObject.searchableAttributes
      ) &&
      Objects.equals(
        this.attributesForFaceting,
        searchParamsObject.attributesForFaceting
      ) &&
      Objects.equals(
        this.unretrievableAttributes,
        searchParamsObject.unretrievableAttributes
      ) &&
      Objects.equals(
        this.attributesToRetrieve,
        searchParamsObject.attributesToRetrieve
      ) &&
      Objects.equals(
        this.restrictSearchableAttributes,
        searchParamsObject.restrictSearchableAttributes
      ) &&
      Objects.equals(this.ranking, searchParamsObject.ranking) &&
      Objects.equals(this.customRanking, searchParamsObject.customRanking) &&
      Objects.equals(
        this.relevancyStrictness,
        searchParamsObject.relevancyStrictness
      ) &&
      Objects.equals(
        this.attributesToHighlight,
        searchParamsObject.attributesToHighlight
      ) &&
      Objects.equals(
        this.attributesToSnippet,
        searchParamsObject.attributesToSnippet
      ) &&
      Objects.equals(
        this.highlightPreTag,
        searchParamsObject.highlightPreTag
      ) &&
      Objects.equals(
        this.highlightPostTag,
        searchParamsObject.highlightPostTag
      ) &&
      Objects.equals(
        this.snippetEllipsisText,
        searchParamsObject.snippetEllipsisText
      ) &&
      Objects.equals(
        this.restrictHighlightAndSnippetArrays,
        searchParamsObject.restrictHighlightAndSnippetArrays
      ) &&
      Objects.equals(this.hitsPerPage, searchParamsObject.hitsPerPage) &&
      Objects.equals(
        this.minWordSizefor1Typo,
        searchParamsObject.minWordSizefor1Typo
      ) &&
      Objects.equals(
        this.minWordSizefor2Typos,
        searchParamsObject.minWordSizefor2Typos
      ) &&
      Objects.equals(this.typoTolerance, searchParamsObject.typoTolerance) &&
      Objects.equals(
        this.allowTyposOnNumericTokens,
        searchParamsObject.allowTyposOnNumericTokens
      ) &&
      Objects.equals(
        this.disableTypoToleranceOnAttributes,
        searchParamsObject.disableTypoToleranceOnAttributes
      ) &&
      Objects.equals(
        this.separatorsToIndex,
        searchParamsObject.separatorsToIndex
      ) &&
      Objects.equals(this.ignorePlurals, searchParamsObject.ignorePlurals) &&
      Objects.equals(
        this.removeStopWords,
        searchParamsObject.removeStopWords
      ) &&
      Objects.equals(
        this.keepDiacriticsOnCharacters,
        searchParamsObject.keepDiacriticsOnCharacters
      ) &&
      Objects.equals(this.queryLanguages, searchParamsObject.queryLanguages) &&
      Objects.equals(
        this.decompoundQuery,
        searchParamsObject.decompoundQuery
      ) &&
      Objects.equals(this.enableRules, searchParamsObject.enableRules) &&
      Objects.equals(
        this.enablePersonalization,
        searchParamsObject.enablePersonalization
      ) &&
      Objects.equals(this.queryType, searchParamsObject.queryType) &&
      Objects.equals(
        this.removeWordsIfNoResults,
        searchParamsObject.removeWordsIfNoResults
      ) &&
      Objects.equals(this.advancedSyntax, searchParamsObject.advancedSyntax) &&
      Objects.equals(this.optionalWords, searchParamsObject.optionalWords) &&
      Objects.equals(
        this.disableExactOnAttributes,
        searchParamsObject.disableExactOnAttributes
      ) &&
      Objects.equals(
        this.exactOnSingleWordQuery,
        searchParamsObject.exactOnSingleWordQuery
      ) &&
      Objects.equals(
        this.alternativesAsExact,
        searchParamsObject.alternativesAsExact
      ) &&
      Objects.equals(
        this.advancedSyntaxFeatures,
        searchParamsObject.advancedSyntaxFeatures
      ) &&
      Objects.equals(this.distinct, searchParamsObject.distinct) &&
      Objects.equals(this.synonyms, searchParamsObject.synonyms) &&
      Objects.equals(
        this.replaceSynonymsInHighlight,
        searchParamsObject.replaceSynonymsInHighlight
      ) &&
      Objects.equals(this.minProximity, searchParamsObject.minProximity) &&
      Objects.equals(this.responseFields, searchParamsObject.responseFields) &&
      Objects.equals(this.maxFacetHits, searchParamsObject.maxFacetHits) &&
      Objects.equals(
        this.attributeCriteriaComputedByMinProximity,
        searchParamsObject.attributeCriteriaComputedByMinProximity
      ) &&
      Objects.equals(this.renderingContent, searchParamsObject.renderingContent)
    );
  }

  private static <T> boolean equalsNullable(
    JsonNullable<T> a,
    JsonNullable<T> b
  ) {
    return (
      a == b ||
      (
        a != null &&
        b != null &&
        a.isPresent() &&
        b.isPresent() &&
        Objects.deepEquals(a.get(), b.get())
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      query,
      similarQuery,
      filters,
      facetFilters,
      optionalFilters,
      numericFilters,
      tagFilters,
      sumOrFiltersScores,
      facets,
      maxValuesPerFacet,
      facetingAfterDistinct,
      sortFacetValuesBy,
      page,
      offset,
      length,
      aroundLatLng,
      aroundLatLngViaIP,
      aroundRadius,
      aroundPrecision,
      minimumAroundRadius,
      insideBoundingBox,
      insidePolygon,
      naturalLanguages,
      ruleContexts,
      personalizationImpact,
      userToken,
      getRankingInfo,
      clickAnalytics,
      analytics,
      analyticsTags,
      percentileComputation,
      enableABTest,
      enableReRanking,
      searchableAttributes,
      attributesForFaceting,
      unretrievableAttributes,
      attributesToRetrieve,
      restrictSearchableAttributes,
      ranking,
      customRanking,
      relevancyStrictness,
      attributesToHighlight,
      attributesToSnippet,
      highlightPreTag,
      highlightPostTag,
      snippetEllipsisText,
      restrictHighlightAndSnippetArrays,
      hitsPerPage,
      minWordSizefor1Typo,
      minWordSizefor2Typos,
      typoTolerance,
      allowTyposOnNumericTokens,
      disableTypoToleranceOnAttributes,
      separatorsToIndex,
      ignorePlurals,
      removeStopWords,
      keepDiacriticsOnCharacters,
      queryLanguages,
      decompoundQuery,
      enableRules,
      enablePersonalization,
      queryType,
      removeWordsIfNoResults,
      advancedSyntax,
      optionalWords,
      disableExactOnAttributes,
      exactOnSingleWordQuery,
      alternativesAsExact,
      advancedSyntaxFeatures,
      distinct,
      synonyms,
      replaceSynonymsInHighlight,
      minProximity,
      responseFields,
      maxFacetHits,
      attributeCriteriaComputedByMinProximity,
      renderingContent
    );
  }

  private static <T> int hashCodeNullable(JsonNullable<T> a) {
    if (a == null) {
      return 1;
    }
    return a.isPresent() ? Arrays.deepHashCode(new Object[] { a.get() }) : 31;
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchParamsObject {\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
    sb
      .append("    similarQuery: ")
      .append(toIndentedString(similarQuery))
      .append("\n");
    sb.append("    filters: ").append(toIndentedString(filters)).append("\n");
    sb
      .append("    facetFilters: ")
      .append(toIndentedString(facetFilters))
      .append("\n");
    sb
      .append("    optionalFilters: ")
      .append(toIndentedString(optionalFilters))
      .append("\n");
    sb
      .append("    numericFilters: ")
      .append(toIndentedString(numericFilters))
      .append("\n");
    sb
      .append("    tagFilters: ")
      .append(toIndentedString(tagFilters))
      .append("\n");
    sb
      .append("    sumOrFiltersScores: ")
      .append(toIndentedString(sumOrFiltersScores))
      .append("\n");
    sb.append("    facets: ").append(toIndentedString(facets)).append("\n");
    sb
      .append("    maxValuesPerFacet: ")
      .append(toIndentedString(maxValuesPerFacet))
      .append("\n");
    sb
      .append("    facetingAfterDistinct: ")
      .append(toIndentedString(facetingAfterDistinct))
      .append("\n");
    sb
      .append("    sortFacetValuesBy: ")
      .append(toIndentedString(sortFacetValuesBy))
      .append("\n");
    sb.append("    page: ").append(toIndentedString(page)).append("\n");
    sb.append("    offset: ").append(toIndentedString(offset)).append("\n");
    sb.append("    length: ").append(toIndentedString(length)).append("\n");
    sb
      .append("    aroundLatLng: ")
      .append(toIndentedString(aroundLatLng))
      .append("\n");
    sb
      .append("    aroundLatLngViaIP: ")
      .append(toIndentedString(aroundLatLngViaIP))
      .append("\n");
    sb
      .append("    aroundRadius: ")
      .append(toIndentedString(aroundRadius))
      .append("\n");
    sb
      .append("    aroundPrecision: ")
      .append(toIndentedString(aroundPrecision))
      .append("\n");
    sb
      .append("    minimumAroundRadius: ")
      .append(toIndentedString(minimumAroundRadius))
      .append("\n");
    sb
      .append("    insideBoundingBox: ")
      .append(toIndentedString(insideBoundingBox))
      .append("\n");
    sb
      .append("    insidePolygon: ")
      .append(toIndentedString(insidePolygon))
      .append("\n");
    sb
      .append("    naturalLanguages: ")
      .append(toIndentedString(naturalLanguages))
      .append("\n");
    sb
      .append("    ruleContexts: ")
      .append(toIndentedString(ruleContexts))
      .append("\n");
    sb
      .append("    personalizationImpact: ")
      .append(toIndentedString(personalizationImpact))
      .append("\n");
    sb
      .append("    userToken: ")
      .append(toIndentedString(userToken))
      .append("\n");
    sb
      .append("    getRankingInfo: ")
      .append(toIndentedString(getRankingInfo))
      .append("\n");
    sb
      .append("    clickAnalytics: ")
      .append(toIndentedString(clickAnalytics))
      .append("\n");
    sb
      .append("    analytics: ")
      .append(toIndentedString(analytics))
      .append("\n");
    sb
      .append("    analyticsTags: ")
      .append(toIndentedString(analyticsTags))
      .append("\n");
    sb
      .append("    percentileComputation: ")
      .append(toIndentedString(percentileComputation))
      .append("\n");
    sb
      .append("    enableABTest: ")
      .append(toIndentedString(enableABTest))
      .append("\n");
    sb
      .append("    enableReRanking: ")
      .append(toIndentedString(enableReRanking))
      .append("\n");
    sb
      .append("    searchableAttributes: ")
      .append(toIndentedString(searchableAttributes))
      .append("\n");
    sb
      .append("    attributesForFaceting: ")
      .append(toIndentedString(attributesForFaceting))
      .append("\n");
    sb
      .append("    unretrievableAttributes: ")
      .append(toIndentedString(unretrievableAttributes))
      .append("\n");
    sb
      .append("    attributesToRetrieve: ")
      .append(toIndentedString(attributesToRetrieve))
      .append("\n");
    sb
      .append("    restrictSearchableAttributes: ")
      .append(toIndentedString(restrictSearchableAttributes))
      .append("\n");
    sb.append("    ranking: ").append(toIndentedString(ranking)).append("\n");
    sb
      .append("    customRanking: ")
      .append(toIndentedString(customRanking))
      .append("\n");
    sb
      .append("    relevancyStrictness: ")
      .append(toIndentedString(relevancyStrictness))
      .append("\n");
    sb
      .append("    attributesToHighlight: ")
      .append(toIndentedString(attributesToHighlight))
      .append("\n");
    sb
      .append("    attributesToSnippet: ")
      .append(toIndentedString(attributesToSnippet))
      .append("\n");
    sb
      .append("    highlightPreTag: ")
      .append(toIndentedString(highlightPreTag))
      .append("\n");
    sb
      .append("    highlightPostTag: ")
      .append(toIndentedString(highlightPostTag))
      .append("\n");
    sb
      .append("    snippetEllipsisText: ")
      .append(toIndentedString(snippetEllipsisText))
      .append("\n");
    sb
      .append("    restrictHighlightAndSnippetArrays: ")
      .append(toIndentedString(restrictHighlightAndSnippetArrays))
      .append("\n");
    sb
      .append("    hitsPerPage: ")
      .append(toIndentedString(hitsPerPage))
      .append("\n");
    sb
      .append("    minWordSizefor1Typo: ")
      .append(toIndentedString(minWordSizefor1Typo))
      .append("\n");
    sb
      .append("    minWordSizefor2Typos: ")
      .append(toIndentedString(minWordSizefor2Typos))
      .append("\n");
    sb
      .append("    typoTolerance: ")
      .append(toIndentedString(typoTolerance))
      .append("\n");
    sb
      .append("    allowTyposOnNumericTokens: ")
      .append(toIndentedString(allowTyposOnNumericTokens))
      .append("\n");
    sb
      .append("    disableTypoToleranceOnAttributes: ")
      .append(toIndentedString(disableTypoToleranceOnAttributes))
      .append("\n");
    sb
      .append("    separatorsToIndex: ")
      .append(toIndentedString(separatorsToIndex))
      .append("\n");
    sb
      .append("    ignorePlurals: ")
      .append(toIndentedString(ignorePlurals))
      .append("\n");
    sb
      .append("    removeStopWords: ")
      .append(toIndentedString(removeStopWords))
      .append("\n");
    sb
      .append("    keepDiacriticsOnCharacters: ")
      .append(toIndentedString(keepDiacriticsOnCharacters))
      .append("\n");
    sb
      .append("    queryLanguages: ")
      .append(toIndentedString(queryLanguages))
      .append("\n");
    sb
      .append("    decompoundQuery: ")
      .append(toIndentedString(decompoundQuery))
      .append("\n");
    sb
      .append("    enableRules: ")
      .append(toIndentedString(enableRules))
      .append("\n");
    sb
      .append("    enablePersonalization: ")
      .append(toIndentedString(enablePersonalization))
      .append("\n");
    sb
      .append("    queryType: ")
      .append(toIndentedString(queryType))
      .append("\n");
    sb
      .append("    removeWordsIfNoResults: ")
      .append(toIndentedString(removeWordsIfNoResults))
      .append("\n");
    sb
      .append("    advancedSyntax: ")
      .append(toIndentedString(advancedSyntax))
      .append("\n");
    sb
      .append("    optionalWords: ")
      .append(toIndentedString(optionalWords))
      .append("\n");
    sb
      .append("    disableExactOnAttributes: ")
      .append(toIndentedString(disableExactOnAttributes))
      .append("\n");
    sb
      .append("    exactOnSingleWordQuery: ")
      .append(toIndentedString(exactOnSingleWordQuery))
      .append("\n");
    sb
      .append("    alternativesAsExact: ")
      .append(toIndentedString(alternativesAsExact))
      .append("\n");
    sb
      .append("    advancedSyntaxFeatures: ")
      .append(toIndentedString(advancedSyntaxFeatures))
      .append("\n");
    sb.append("    distinct: ").append(toIndentedString(distinct)).append("\n");
    sb.append("    synonyms: ").append(toIndentedString(synonyms)).append("\n");
    sb
      .append("    replaceSynonymsInHighlight: ")
      .append(toIndentedString(replaceSynonymsInHighlight))
      .append("\n");
    sb
      .append("    minProximity: ")
      .append(toIndentedString(minProximity))
      .append("\n");
    sb
      .append("    responseFields: ")
      .append(toIndentedString(responseFields))
      .append("\n");
    sb
      .append("    maxFacetHits: ")
      .append(toIndentedString(maxFacetHits))
      .append("\n");
    sb
      .append("    attributeCriteriaComputedByMinProximity: ")
      .append(toIndentedString(attributeCriteriaComputedByMinProximity))
      .append("\n");
    sb
      .append("    renderingContent: ")
      .append(toIndentedString(renderingContent))
      .append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces (except the first line).
   */
  private String toIndentedString(Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
