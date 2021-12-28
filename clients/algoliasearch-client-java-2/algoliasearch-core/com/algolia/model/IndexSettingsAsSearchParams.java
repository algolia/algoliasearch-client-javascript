package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** IndexSettingsAsSearchParams */
public class IndexSettingsAsSearchParams {

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

  public IndexSettingsAsSearchParams searchableAttributes(
    List<String> searchableAttributes
  ) {
    this.searchableAttributes = searchableAttributes;
    return this;
  }

  public IndexSettingsAsSearchParams addSearchableAttributesItem(
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

  public IndexSettingsAsSearchParams attributesForFaceting(
    List<String> attributesForFaceting
  ) {
    this.attributesForFaceting = attributesForFaceting;
    return this;
  }

  public IndexSettingsAsSearchParams addAttributesForFacetingItem(
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

  public IndexSettingsAsSearchParams unretrievableAttributes(
    List<String> unretrievableAttributes
  ) {
    this.unretrievableAttributes = unretrievableAttributes;
    return this;
  }

  public IndexSettingsAsSearchParams addUnretrievableAttributesItem(
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

  public IndexSettingsAsSearchParams attributesToRetrieve(
    List<String> attributesToRetrieve
  ) {
    this.attributesToRetrieve = attributesToRetrieve;
    return this;
  }

  public IndexSettingsAsSearchParams addAttributesToRetrieveItem(
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

  public IndexSettingsAsSearchParams restrictSearchableAttributes(
    List<String> restrictSearchableAttributes
  ) {
    this.restrictSearchableAttributes = restrictSearchableAttributes;
    return this;
  }

  public IndexSettingsAsSearchParams addRestrictSearchableAttributesItem(
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

  public IndexSettingsAsSearchParams ranking(List<String> ranking) {
    this.ranking = ranking;
    return this;
  }

  public IndexSettingsAsSearchParams addRankingItem(String rankingItem) {
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

  public IndexSettingsAsSearchParams customRanking(List<String> customRanking) {
    this.customRanking = customRanking;
    return this;
  }

  public IndexSettingsAsSearchParams addCustomRankingItem(
    String customRankingItem
  ) {
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

  public IndexSettingsAsSearchParams relevancyStrictness(
    Integer relevancyStrictness
  ) {
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

  public IndexSettingsAsSearchParams attributesToHighlight(
    List<String> attributesToHighlight
  ) {
    this.attributesToHighlight = attributesToHighlight;
    return this;
  }

  public IndexSettingsAsSearchParams addAttributesToHighlightItem(
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

  public IndexSettingsAsSearchParams attributesToSnippet(
    List<String> attributesToSnippet
  ) {
    this.attributesToSnippet = attributesToSnippet;
    return this;
  }

  public IndexSettingsAsSearchParams addAttributesToSnippetItem(
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

  public IndexSettingsAsSearchParams highlightPreTag(String highlightPreTag) {
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

  public IndexSettingsAsSearchParams highlightPostTag(String highlightPostTag) {
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

  public IndexSettingsAsSearchParams snippetEllipsisText(
    String snippetEllipsisText
  ) {
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

  public IndexSettingsAsSearchParams restrictHighlightAndSnippetArrays(
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

  public IndexSettingsAsSearchParams hitsPerPage(Integer hitsPerPage) {
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

  public IndexSettingsAsSearchParams minWordSizefor1Typo(
    Integer minWordSizefor1Typo
  ) {
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

  public IndexSettingsAsSearchParams minWordSizefor2Typos(
    Integer minWordSizefor2Typos
  ) {
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

  public IndexSettingsAsSearchParams typoTolerance(
    TypoToleranceEnum typoTolerance
  ) {
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

  public IndexSettingsAsSearchParams allowTyposOnNumericTokens(
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

  public IndexSettingsAsSearchParams disableTypoToleranceOnAttributes(
    List<String> disableTypoToleranceOnAttributes
  ) {
    this.disableTypoToleranceOnAttributes = disableTypoToleranceOnAttributes;
    return this;
  }

  public IndexSettingsAsSearchParams addDisableTypoToleranceOnAttributesItem(
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

  public IndexSettingsAsSearchParams separatorsToIndex(
    String separatorsToIndex
  ) {
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

  public IndexSettingsAsSearchParams ignorePlurals(String ignorePlurals) {
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

  public IndexSettingsAsSearchParams removeStopWords(String removeStopWords) {
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

  public IndexSettingsAsSearchParams keepDiacriticsOnCharacters(
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

  public IndexSettingsAsSearchParams queryLanguages(
    List<String> queryLanguages
  ) {
    this.queryLanguages = queryLanguages;
    return this;
  }

  public IndexSettingsAsSearchParams addQueryLanguagesItem(
    String queryLanguagesItem
  ) {
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

  public IndexSettingsAsSearchParams decompoundQuery(Boolean decompoundQuery) {
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

  public IndexSettingsAsSearchParams enableRules(Boolean enableRules) {
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

  public IndexSettingsAsSearchParams enablePersonalization(
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

  public IndexSettingsAsSearchParams queryType(QueryTypeEnum queryType) {
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

  public IndexSettingsAsSearchParams removeWordsIfNoResults(
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

  public IndexSettingsAsSearchParams advancedSyntax(Boolean advancedSyntax) {
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

  public IndexSettingsAsSearchParams optionalWords(List<String> optionalWords) {
    this.optionalWords = optionalWords;
    return this;
  }

  public IndexSettingsAsSearchParams addOptionalWordsItem(
    String optionalWordsItem
  ) {
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

  public IndexSettingsAsSearchParams disableExactOnAttributes(
    List<String> disableExactOnAttributes
  ) {
    this.disableExactOnAttributes = disableExactOnAttributes;
    return this;
  }

  public IndexSettingsAsSearchParams addDisableExactOnAttributesItem(
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

  public IndexSettingsAsSearchParams exactOnSingleWordQuery(
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

  public IndexSettingsAsSearchParams alternativesAsExact(
    List<AlternativesAsExactEnum> alternativesAsExact
  ) {
    this.alternativesAsExact = alternativesAsExact;
    return this;
  }

  public IndexSettingsAsSearchParams addAlternativesAsExactItem(
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

  public IndexSettingsAsSearchParams advancedSyntaxFeatures(
    List<AdvancedSyntaxFeaturesEnum> advancedSyntaxFeatures
  ) {
    this.advancedSyntaxFeatures = advancedSyntaxFeatures;
    return this;
  }

  public IndexSettingsAsSearchParams addAdvancedSyntaxFeaturesItem(
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

  public IndexSettingsAsSearchParams distinct(Integer distinct) {
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

  public IndexSettingsAsSearchParams synonyms(Boolean synonyms) {
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

  public IndexSettingsAsSearchParams replaceSynonymsInHighlight(
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

  public IndexSettingsAsSearchParams minProximity(Integer minProximity) {
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

  public IndexSettingsAsSearchParams responseFields(
    List<String> responseFields
  ) {
    this.responseFields = responseFields;
    return this;
  }

  public IndexSettingsAsSearchParams addResponseFieldsItem(
    String responseFieldsItem
  ) {
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

  public IndexSettingsAsSearchParams maxFacetHits(Integer maxFacetHits) {
    this.maxFacetHits = maxFacetHits;
    return this;
  }

  /**
   * Maximum number of facet hits to return during a search for facet values.
   *
   * @return maxFacetHits
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Maximum number of facet hits to return during a search for facet values."
  )
  public Integer getMaxFacetHits() {
    return maxFacetHits;
  }

  public void setMaxFacetHits(Integer maxFacetHits) {
    this.maxFacetHits = maxFacetHits;
  }

  public IndexSettingsAsSearchParams attributeCriteriaComputedByMinProximity(
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

  public IndexSettingsAsSearchParams renderingContent(Object renderingContent) {
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
    IndexSettingsAsSearchParams indexSettingsAsSearchParams = (IndexSettingsAsSearchParams) o;
    return (
      Objects.equals(
        this.searchableAttributes,
        indexSettingsAsSearchParams.searchableAttributes
      ) &&
      Objects.equals(
        this.attributesForFaceting,
        indexSettingsAsSearchParams.attributesForFaceting
      ) &&
      Objects.equals(
        this.unretrievableAttributes,
        indexSettingsAsSearchParams.unretrievableAttributes
      ) &&
      Objects.equals(
        this.attributesToRetrieve,
        indexSettingsAsSearchParams.attributesToRetrieve
      ) &&
      Objects.equals(
        this.restrictSearchableAttributes,
        indexSettingsAsSearchParams.restrictSearchableAttributes
      ) &&
      Objects.equals(this.ranking, indexSettingsAsSearchParams.ranking) &&
      Objects.equals(
        this.customRanking,
        indexSettingsAsSearchParams.customRanking
      ) &&
      Objects.equals(
        this.relevancyStrictness,
        indexSettingsAsSearchParams.relevancyStrictness
      ) &&
      Objects.equals(
        this.attributesToHighlight,
        indexSettingsAsSearchParams.attributesToHighlight
      ) &&
      Objects.equals(
        this.attributesToSnippet,
        indexSettingsAsSearchParams.attributesToSnippet
      ) &&
      Objects.equals(
        this.highlightPreTag,
        indexSettingsAsSearchParams.highlightPreTag
      ) &&
      Objects.equals(
        this.highlightPostTag,
        indexSettingsAsSearchParams.highlightPostTag
      ) &&
      Objects.equals(
        this.snippetEllipsisText,
        indexSettingsAsSearchParams.snippetEllipsisText
      ) &&
      Objects.equals(
        this.restrictHighlightAndSnippetArrays,
        indexSettingsAsSearchParams.restrictHighlightAndSnippetArrays
      ) &&
      Objects.equals(
        this.hitsPerPage,
        indexSettingsAsSearchParams.hitsPerPage
      ) &&
      Objects.equals(
        this.minWordSizefor1Typo,
        indexSettingsAsSearchParams.minWordSizefor1Typo
      ) &&
      Objects.equals(
        this.minWordSizefor2Typos,
        indexSettingsAsSearchParams.minWordSizefor2Typos
      ) &&
      Objects.equals(
        this.typoTolerance,
        indexSettingsAsSearchParams.typoTolerance
      ) &&
      Objects.equals(
        this.allowTyposOnNumericTokens,
        indexSettingsAsSearchParams.allowTyposOnNumericTokens
      ) &&
      Objects.equals(
        this.disableTypoToleranceOnAttributes,
        indexSettingsAsSearchParams.disableTypoToleranceOnAttributes
      ) &&
      Objects.equals(
        this.separatorsToIndex,
        indexSettingsAsSearchParams.separatorsToIndex
      ) &&
      Objects.equals(
        this.ignorePlurals,
        indexSettingsAsSearchParams.ignorePlurals
      ) &&
      Objects.equals(
        this.removeStopWords,
        indexSettingsAsSearchParams.removeStopWords
      ) &&
      Objects.equals(
        this.keepDiacriticsOnCharacters,
        indexSettingsAsSearchParams.keepDiacriticsOnCharacters
      ) &&
      Objects.equals(
        this.queryLanguages,
        indexSettingsAsSearchParams.queryLanguages
      ) &&
      Objects.equals(
        this.decompoundQuery,
        indexSettingsAsSearchParams.decompoundQuery
      ) &&
      Objects.equals(
        this.enableRules,
        indexSettingsAsSearchParams.enableRules
      ) &&
      Objects.equals(
        this.enablePersonalization,
        indexSettingsAsSearchParams.enablePersonalization
      ) &&
      Objects.equals(this.queryType, indexSettingsAsSearchParams.queryType) &&
      Objects.equals(
        this.removeWordsIfNoResults,
        indexSettingsAsSearchParams.removeWordsIfNoResults
      ) &&
      Objects.equals(
        this.advancedSyntax,
        indexSettingsAsSearchParams.advancedSyntax
      ) &&
      Objects.equals(
        this.optionalWords,
        indexSettingsAsSearchParams.optionalWords
      ) &&
      Objects.equals(
        this.disableExactOnAttributes,
        indexSettingsAsSearchParams.disableExactOnAttributes
      ) &&
      Objects.equals(
        this.exactOnSingleWordQuery,
        indexSettingsAsSearchParams.exactOnSingleWordQuery
      ) &&
      Objects.equals(
        this.alternativesAsExact,
        indexSettingsAsSearchParams.alternativesAsExact
      ) &&
      Objects.equals(
        this.advancedSyntaxFeatures,
        indexSettingsAsSearchParams.advancedSyntaxFeatures
      ) &&
      Objects.equals(this.distinct, indexSettingsAsSearchParams.distinct) &&
      Objects.equals(this.synonyms, indexSettingsAsSearchParams.synonyms) &&
      Objects.equals(
        this.replaceSynonymsInHighlight,
        indexSettingsAsSearchParams.replaceSynonymsInHighlight
      ) &&
      Objects.equals(
        this.minProximity,
        indexSettingsAsSearchParams.minProximity
      ) &&
      Objects.equals(
        this.responseFields,
        indexSettingsAsSearchParams.responseFields
      ) &&
      Objects.equals(
        this.maxFacetHits,
        indexSettingsAsSearchParams.maxFacetHits
      ) &&
      Objects.equals(
        this.attributeCriteriaComputedByMinProximity,
        indexSettingsAsSearchParams.attributeCriteriaComputedByMinProximity
      ) &&
      Objects.equals(
        this.renderingContent,
        indexSettingsAsSearchParams.renderingContent
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
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

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class IndexSettingsAsSearchParams {\n");
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
