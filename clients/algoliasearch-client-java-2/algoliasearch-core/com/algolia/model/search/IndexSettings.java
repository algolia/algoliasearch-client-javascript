package com.algolia.model.search;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** The Algolia index settings. */
public class IndexSettings {

  @SerializedName("replicas")
  private List<String> replicas = null;

  @SerializedName("paginationLimitedTo")
  private Integer paginationLimitedTo = 1000;

  @SerializedName("disableTypoToleranceOnWords")
  private List<String> disableTypoToleranceOnWords = null;

  @SerializedName("attributesToTransliterate")
  private List<String> attributesToTransliterate = null;

  @SerializedName("camelCaseAttributes")
  private List<String> camelCaseAttributes = null;

  @SerializedName("decompoundedAttributes")
  private Object decompoundedAttributes = new Object();

  @SerializedName("indexLanguages")
  private List<String> indexLanguages = null;

  @SerializedName("filterPromotes")
  private Boolean filterPromotes = false;

  @SerializedName("disablePrefixOnAttributes")
  private List<String> disablePrefixOnAttributes = null;

  @SerializedName("allowCompressionOfIntegerArray")
  private Boolean allowCompressionOfIntegerArray = false;

  @SerializedName("numericAttributesForFiltering")
  private List<String> numericAttributesForFiltering = null;

  @SerializedName("userData")
  private Object userData = new Object();

  @SerializedName("searchableAttributes")
  private List<String> searchableAttributes = null;

  @SerializedName("attributesForFaceting")
  private List<String> attributesForFaceting = null;

  @SerializedName("unretrievableAttributes")
  private List<String> unretrievableAttributes = null;

  @SerializedName("attributesToRetrieve")
  private List<String> attributesToRetrieve = null;

  @SerializedName("restrictSearchableAttributes")
  private List<String> restrictSearchableAttributes = null;

  @SerializedName("ranking")
  private List<String> ranking = null;

  @SerializedName("customRanking")
  private List<String> customRanking = null;

  @SerializedName("relevancyStrictness")
  private Integer relevancyStrictness = 100;

  @SerializedName("attributesToHighlight")
  private List<String> attributesToHighlight = null;

  @SerializedName("attributesToSnippet")
  private List<String> attributesToSnippet = null;

  @SerializedName("highlightPreTag")
  private String highlightPreTag = "<em>";

  @SerializedName("highlightPostTag")
  private String highlightPostTag = "</em>";

  @SerializedName("snippetEllipsisText")
  private String snippetEllipsisText = "…";

  @SerializedName("restrictHighlightAndSnippetArrays")
  private Boolean restrictHighlightAndSnippetArrays = false;

  @SerializedName("hitsPerPage")
  private Integer hitsPerPage = 20;

  @SerializedName("minWordSizefor1Typo")
  private Integer minWordSizefor1Typo = 4;

  @SerializedName("minWordSizefor2Typos")
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

  @SerializedName("typoTolerance")
  private TypoToleranceEnum typoTolerance = TypoToleranceEnum.TRUE;

  @SerializedName("allowTyposOnNumericTokens")
  private Boolean allowTyposOnNumericTokens = true;

  @SerializedName("disableTypoToleranceOnAttributes")
  private List<String> disableTypoToleranceOnAttributes = null;

  @SerializedName("separatorsToIndex")
  private String separatorsToIndex = "";

  @SerializedName("ignorePlurals")
  private String ignorePlurals = "false";

  @SerializedName("removeStopWords")
  private String removeStopWords = "false";

  @SerializedName("keepDiacriticsOnCharacters")
  private String keepDiacriticsOnCharacters = "";

  @SerializedName("queryLanguages")
  private List<String> queryLanguages = null;

  @SerializedName("decompoundQuery")
  private Boolean decompoundQuery = true;

  @SerializedName("enableRules")
  private Boolean enableRules = true;

  @SerializedName("enablePersonalization")
  private Boolean enablePersonalization = false;

  /** Controls if and how query words are interpreted as prefixes. */
  @JsonAdapter(QueryTypeEnum.Adapter.class)
  public enum QueryTypeEnum {
    PREFIX_LAST("prefixLast"),

    PREFIX_ALL("prefixAll"),

    PREFIX_NONE("prefixNone");

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

  @SerializedName("queryType")
  private QueryTypeEnum queryType = QueryTypeEnum.PREFIX_LAST;

  /** Selects a strategy to remove words from the query when it doesn't match any hits. */
  @JsonAdapter(RemoveWordsIfNoResultsEnum.Adapter.class)
  public enum RemoveWordsIfNoResultsEnum {
    NONE("none"),

    LAST_WORDS("lastWords"),

    FIRST_WORDS("firstWords"),

    ALL_OPTIONAL("allOptional");

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

  @SerializedName("removeWordsIfNoResults")
  private RemoveWordsIfNoResultsEnum removeWordsIfNoResults =
    RemoveWordsIfNoResultsEnum.NONE;

  @SerializedName("advancedSyntax")
  private Boolean advancedSyntax = false;

  @SerializedName("optionalWords")
  private List<String> optionalWords = null;

  @SerializedName("disableExactOnAttributes")
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

  @SerializedName("exactOnSingleWordQuery")
  private ExactOnSingleWordQueryEnum exactOnSingleWordQuery =
    ExactOnSingleWordQueryEnum.ATTRIBUTE;

  /** Gets or Sets alternativesAsExact */
  @JsonAdapter(AlternativesAsExactEnum.Adapter.class)
  public enum AlternativesAsExactEnum {
    IGNORE_PLURALS("ignorePlurals"),

    SINGLE_WORD_SYNONYM("singleWordSynonym"),

    MULTI_WORDS_SYNONYM("multiWordsSynonym");

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

  @SerializedName("alternativesAsExact")
  private List<AlternativesAsExactEnum> alternativesAsExact = null;

  /** Gets or Sets advancedSyntaxFeatures */
  @JsonAdapter(AdvancedSyntaxFeaturesEnum.Adapter.class)
  public enum AdvancedSyntaxFeaturesEnum {
    EXACT_PHRASE("exactPhrase"),

    EXCLUDE_WORDS("excludeWords");

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

  @SerializedName("advancedSyntaxFeatures")
  private List<AdvancedSyntaxFeaturesEnum> advancedSyntaxFeatures = null;

  @SerializedName("distinct")
  private Integer distinct = 0;

  @SerializedName("synonyms")
  private Boolean synonyms = true;

  @SerializedName("replaceSynonymsInHighlight")
  private Boolean replaceSynonymsInHighlight = false;

  @SerializedName("minProximity")
  private Integer minProximity = 1;

  @SerializedName("responseFields")
  private List<String> responseFields = null;

  @SerializedName("maxFacetHits")
  private Integer maxFacetHits = 10;

  @SerializedName("attributeCriteriaComputedByMinProximity")
  private Boolean attributeCriteriaComputedByMinProximity = false;

  @SerializedName("renderingContent")
  private Object renderingContent = new Object();

  public IndexSettings setReplicas(List<String> replicas) {
    this.replicas = replicas;
    return this;
  }

  public IndexSettings addReplicasItem(String replicasItem) {
    if (this.replicas == null) {
      this.replicas = new ArrayList<>();
    }
    this.replicas.add(replicasItem);
    return this;
  }

  /**
   * Creates replicas, exact copies of an index.
   *
   * @return replicas
   */
  @javax.annotation.Nullable
  public List<String> getReplicas() {
    return replicas;
  }

  public IndexSettings setPaginationLimitedTo(Integer paginationLimitedTo) {
    this.paginationLimitedTo = paginationLimitedTo;
    return this;
  }

  /**
   * Set the maximum number of hits accessible via pagination.
   *
   * @return paginationLimitedTo
   */
  @javax.annotation.Nullable
  public Integer getPaginationLimitedTo() {
    return paginationLimitedTo;
  }

  public IndexSettings setDisableTypoToleranceOnWords(
    List<String> disableTypoToleranceOnWords
  ) {
    this.disableTypoToleranceOnWords = disableTypoToleranceOnWords;
    return this;
  }

  public IndexSettings addDisableTypoToleranceOnWordsItem(
    String disableTypoToleranceOnWordsItem
  ) {
    if (this.disableTypoToleranceOnWords == null) {
      this.disableTypoToleranceOnWords = new ArrayList<>();
    }
    this.disableTypoToleranceOnWords.add(disableTypoToleranceOnWordsItem);
    return this;
  }

  /**
   * A list of words for which you want to turn off typo tolerance.
   *
   * @return disableTypoToleranceOnWords
   */
  @javax.annotation.Nullable
  public List<String> getDisableTypoToleranceOnWords() {
    return disableTypoToleranceOnWords;
  }

  public IndexSettings setAttributesToTransliterate(
    List<String> attributesToTransliterate
  ) {
    this.attributesToTransliterate = attributesToTransliterate;
    return this;
  }

  public IndexSettings addAttributesToTransliterateItem(
    String attributesToTransliterateItem
  ) {
    if (this.attributesToTransliterate == null) {
      this.attributesToTransliterate = new ArrayList<>();
    }
    this.attributesToTransliterate.add(attributesToTransliterateItem);
    return this;
  }

  /**
   * Specify on which attributes to apply transliteration.
   *
   * @return attributesToTransliterate
   */
  @javax.annotation.Nullable
  public List<String> getAttributesToTransliterate() {
    return attributesToTransliterate;
  }

  public IndexSettings setCamelCaseAttributes(
    List<String> camelCaseAttributes
  ) {
    this.camelCaseAttributes = camelCaseAttributes;
    return this;
  }

  public IndexSettings addCamelCaseAttributesItem(
    String camelCaseAttributesItem
  ) {
    if (this.camelCaseAttributes == null) {
      this.camelCaseAttributes = new ArrayList<>();
    }
    this.camelCaseAttributes.add(camelCaseAttributesItem);
    return this;
  }

  /**
   * List of attributes on which to do a decomposition of camel case words.
   *
   * @return camelCaseAttributes
   */
  @javax.annotation.Nullable
  public List<String> getCamelCaseAttributes() {
    return camelCaseAttributes;
  }

  public IndexSettings setDecompoundedAttributes(
    Object decompoundedAttributes
  ) {
    this.decompoundedAttributes = decompoundedAttributes;
    return this;
  }

  /**
   * Specify on which attributes in your index Algolia should apply word segmentation, also known as
   * decompounding.
   *
   * @return decompoundedAttributes
   */
  @javax.annotation.Nullable
  public Object getDecompoundedAttributes() {
    return decompoundedAttributes;
  }

  public IndexSettings setIndexLanguages(List<String> indexLanguages) {
    this.indexLanguages = indexLanguages;
    return this;
  }

  public IndexSettings addIndexLanguagesItem(String indexLanguagesItem) {
    if (this.indexLanguages == null) {
      this.indexLanguages = new ArrayList<>();
    }
    this.indexLanguages.add(indexLanguagesItem);
    return this;
  }

  /**
   * Sets the languages at the index level for language-specific processing such as tokenization and
   * normalization.
   *
   * @return indexLanguages
   */
  @javax.annotation.Nullable
  public List<String> getIndexLanguages() {
    return indexLanguages;
  }

  public IndexSettings setFilterPromotes(Boolean filterPromotes) {
    this.filterPromotes = filterPromotes;
    return this;
  }

  /**
   * Whether promoted results should match the filters of the current search, except for geographic
   * filters.
   *
   * @return filterPromotes
   */
  @javax.annotation.Nullable
  public Boolean getFilterPromotes() {
    return filterPromotes;
  }

  public IndexSettings setDisablePrefixOnAttributes(
    List<String> disablePrefixOnAttributes
  ) {
    this.disablePrefixOnAttributes = disablePrefixOnAttributes;
    return this;
  }

  public IndexSettings addDisablePrefixOnAttributesItem(
    String disablePrefixOnAttributesItem
  ) {
    if (this.disablePrefixOnAttributes == null) {
      this.disablePrefixOnAttributes = new ArrayList<>();
    }
    this.disablePrefixOnAttributes.add(disablePrefixOnAttributesItem);
    return this;
  }

  /**
   * List of attributes on which you want to disable prefix matching.
   *
   * @return disablePrefixOnAttributes
   */
  @javax.annotation.Nullable
  public List<String> getDisablePrefixOnAttributes() {
    return disablePrefixOnAttributes;
  }

  public IndexSettings setAllowCompressionOfIntegerArray(
    Boolean allowCompressionOfIntegerArray
  ) {
    this.allowCompressionOfIntegerArray = allowCompressionOfIntegerArray;
    return this;
  }

  /**
   * Enables compression of large integer arrays.
   *
   * @return allowCompressionOfIntegerArray
   */
  @javax.annotation.Nullable
  public Boolean getAllowCompressionOfIntegerArray() {
    return allowCompressionOfIntegerArray;
  }

  public IndexSettings setNumericAttributesForFiltering(
    List<String> numericAttributesForFiltering
  ) {
    this.numericAttributesForFiltering = numericAttributesForFiltering;
    return this;
  }

  public IndexSettings addNumericAttributesForFilteringItem(
    String numericAttributesForFilteringItem
  ) {
    if (this.numericAttributesForFiltering == null) {
      this.numericAttributesForFiltering = new ArrayList<>();
    }
    this.numericAttributesForFiltering.add(numericAttributesForFilteringItem);
    return this;
  }

  /**
   * List of numeric attributes that can be used as numerical filters.
   *
   * @return numericAttributesForFiltering
   */
  @javax.annotation.Nullable
  public List<String> getNumericAttributesForFiltering() {
    return numericAttributesForFiltering;
  }

  public IndexSettings setUserData(Object userData) {
    this.userData = userData;
    return this;
  }

  /**
   * Lets you store custom data in your indices.
   *
   * @return userData
   */
  @javax.annotation.Nullable
  public Object getUserData() {
    return userData;
  }

  public IndexSettings setSearchableAttributes(
    List<String> searchableAttributes
  ) {
    this.searchableAttributes = searchableAttributes;
    return this;
  }

  public IndexSettings addSearchableAttributesItem(
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
  public List<String> getSearchableAttributes() {
    return searchableAttributes;
  }

  public IndexSettings setAttributesForFaceting(
    List<String> attributesForFaceting
  ) {
    this.attributesForFaceting = attributesForFaceting;
    return this;
  }

  public IndexSettings addAttributesForFacetingItem(
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
  public List<String> getAttributesForFaceting() {
    return attributesForFaceting;
  }

  public IndexSettings setUnretrievableAttributes(
    List<String> unretrievableAttributes
  ) {
    this.unretrievableAttributes = unretrievableAttributes;
    return this;
  }

  public IndexSettings addUnretrievableAttributesItem(
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
  public List<String> getUnretrievableAttributes() {
    return unretrievableAttributes;
  }

  public IndexSettings setAttributesToRetrieve(
    List<String> attributesToRetrieve
  ) {
    this.attributesToRetrieve = attributesToRetrieve;
    return this;
  }

  public IndexSettings addAttributesToRetrieveItem(
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
  public List<String> getAttributesToRetrieve() {
    return attributesToRetrieve;
  }

  public IndexSettings setRestrictSearchableAttributes(
    List<String> restrictSearchableAttributes
  ) {
    this.restrictSearchableAttributes = restrictSearchableAttributes;
    return this;
  }

  public IndexSettings addRestrictSearchableAttributesItem(
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
  public List<String> getRestrictSearchableAttributes() {
    return restrictSearchableAttributes;
  }

  public IndexSettings setRanking(List<String> ranking) {
    this.ranking = ranking;
    return this;
  }

  public IndexSettings addRankingItem(String rankingItem) {
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
  public List<String> getRanking() {
    return ranking;
  }

  public IndexSettings setCustomRanking(List<String> customRanking) {
    this.customRanking = customRanking;
    return this;
  }

  public IndexSettings addCustomRankingItem(String customRankingItem) {
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
  public List<String> getCustomRanking() {
    return customRanking;
  }

  public IndexSettings setRelevancyStrictness(Integer relevancyStrictness) {
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
  public Integer getRelevancyStrictness() {
    return relevancyStrictness;
  }

  public IndexSettings setAttributesToHighlight(
    List<String> attributesToHighlight
  ) {
    this.attributesToHighlight = attributesToHighlight;
    return this;
  }

  public IndexSettings addAttributesToHighlightItem(
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
  public List<String> getAttributesToHighlight() {
    return attributesToHighlight;
  }

  public IndexSettings setAttributesToSnippet(
    List<String> attributesToSnippet
  ) {
    this.attributesToSnippet = attributesToSnippet;
    return this;
  }

  public IndexSettings addAttributesToSnippetItem(
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
  public List<String> getAttributesToSnippet() {
    return attributesToSnippet;
  }

  public IndexSettings setHighlightPreTag(String highlightPreTag) {
    this.highlightPreTag = highlightPreTag;
    return this;
  }

  /**
   * The HTML string to insert before the highlighted parts in all highlight and snippet results.
   *
   * @return highlightPreTag
   */
  @javax.annotation.Nullable
  public String getHighlightPreTag() {
    return highlightPreTag;
  }

  public IndexSettings setHighlightPostTag(String highlightPostTag) {
    this.highlightPostTag = highlightPostTag;
    return this;
  }

  /**
   * The HTML string to insert after the highlighted parts in all highlight and snippet results.
   *
   * @return highlightPostTag
   */
  @javax.annotation.Nullable
  public String getHighlightPostTag() {
    return highlightPostTag;
  }

  public IndexSettings setSnippetEllipsisText(String snippetEllipsisText) {
    this.snippetEllipsisText = snippetEllipsisText;
    return this;
  }

  /**
   * String used as an ellipsis indicator when a snippet is truncated.
   *
   * @return snippetEllipsisText
   */
  @javax.annotation.Nullable
  public String getSnippetEllipsisText() {
    return snippetEllipsisText;
  }

  public IndexSettings setRestrictHighlightAndSnippetArrays(
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
  public Boolean getRestrictHighlightAndSnippetArrays() {
    return restrictHighlightAndSnippetArrays;
  }

  public IndexSettings setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Set the number of hits per page.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nullable
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public IndexSettings setMinWordSizefor1Typo(Integer minWordSizefor1Typo) {
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
  public Integer getMinWordSizefor1Typo() {
    return minWordSizefor1Typo;
  }

  public IndexSettings setMinWordSizefor2Typos(Integer minWordSizefor2Typos) {
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
  public Integer getMinWordSizefor2Typos() {
    return minWordSizefor2Typos;
  }

  public IndexSettings setTypoTolerance(TypoToleranceEnum typoTolerance) {
    this.typoTolerance = typoTolerance;
    return this;
  }

  /**
   * Controls whether typo tolerance is enabled and how it is applied.
   *
   * @return typoTolerance
   */
  @javax.annotation.Nullable
  public TypoToleranceEnum getTypoTolerance() {
    return typoTolerance;
  }

  public IndexSettings setAllowTyposOnNumericTokens(
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
  public Boolean getAllowTyposOnNumericTokens() {
    return allowTyposOnNumericTokens;
  }

  public IndexSettings setDisableTypoToleranceOnAttributes(
    List<String> disableTypoToleranceOnAttributes
  ) {
    this.disableTypoToleranceOnAttributes = disableTypoToleranceOnAttributes;
    return this;
  }

  public IndexSettings addDisableTypoToleranceOnAttributesItem(
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
  public List<String> getDisableTypoToleranceOnAttributes() {
    return disableTypoToleranceOnAttributes;
  }

  public IndexSettings setSeparatorsToIndex(String separatorsToIndex) {
    this.separatorsToIndex = separatorsToIndex;
    return this;
  }

  /**
   * Control which separators are indexed.
   *
   * @return separatorsToIndex
   */
  @javax.annotation.Nullable
  public String getSeparatorsToIndex() {
    return separatorsToIndex;
  }

  public IndexSettings setIgnorePlurals(String ignorePlurals) {
    this.ignorePlurals = ignorePlurals;
    return this;
  }

  /**
   * Treats singular, plurals, and other forms of declensions as matching terms.
   *
   * @return ignorePlurals
   */
  @javax.annotation.Nullable
  public String getIgnorePlurals() {
    return ignorePlurals;
  }

  public IndexSettings setRemoveStopWords(String removeStopWords) {
    this.removeStopWords = removeStopWords;
    return this;
  }

  /**
   * Removes stop (common) words from the query before executing it.
   *
   * @return removeStopWords
   */
  @javax.annotation.Nullable
  public String getRemoveStopWords() {
    return removeStopWords;
  }

  public IndexSettings setKeepDiacriticsOnCharacters(
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
  public String getKeepDiacriticsOnCharacters() {
    return keepDiacriticsOnCharacters;
  }

  public IndexSettings setQueryLanguages(List<String> queryLanguages) {
    this.queryLanguages = queryLanguages;
    return this;
  }

  public IndexSettings addQueryLanguagesItem(String queryLanguagesItem) {
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
  public List<String> getQueryLanguages() {
    return queryLanguages;
  }

  public IndexSettings setDecompoundQuery(Boolean decompoundQuery) {
    this.decompoundQuery = decompoundQuery;
    return this;
  }

  /**
   * Splits compound words into their composing atoms in the query.
   *
   * @return decompoundQuery
   */
  @javax.annotation.Nullable
  public Boolean getDecompoundQuery() {
    return decompoundQuery;
  }

  public IndexSettings setEnableRules(Boolean enableRules) {
    this.enableRules = enableRules;
    return this;
  }

  /**
   * Whether Rules should be globally enabled.
   *
   * @return enableRules
   */
  @javax.annotation.Nullable
  public Boolean getEnableRules() {
    return enableRules;
  }

  public IndexSettings setEnablePersonalization(Boolean enablePersonalization) {
    this.enablePersonalization = enablePersonalization;
    return this;
  }

  /**
   * Enable the Personalization feature.
   *
   * @return enablePersonalization
   */
  @javax.annotation.Nullable
  public Boolean getEnablePersonalization() {
    return enablePersonalization;
  }

  public IndexSettings setQueryType(QueryTypeEnum queryType) {
    this.queryType = queryType;
    return this;
  }

  /**
   * Controls if and how query words are interpreted as prefixes.
   *
   * @return queryType
   */
  @javax.annotation.Nullable
  public QueryTypeEnum getQueryType() {
    return queryType;
  }

  public IndexSettings setRemoveWordsIfNoResults(
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
  public RemoveWordsIfNoResultsEnum getRemoveWordsIfNoResults() {
    return removeWordsIfNoResults;
  }

  public IndexSettings setAdvancedSyntax(Boolean advancedSyntax) {
    this.advancedSyntax = advancedSyntax;
    return this;
  }

  /**
   * Enables the advanced query syntax.
   *
   * @return advancedSyntax
   */
  @javax.annotation.Nullable
  public Boolean getAdvancedSyntax() {
    return advancedSyntax;
  }

  public IndexSettings setOptionalWords(List<String> optionalWords) {
    this.optionalWords = optionalWords;
    return this;
  }

  public IndexSettings addOptionalWordsItem(String optionalWordsItem) {
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
  public List<String> getOptionalWords() {
    return optionalWords;
  }

  public IndexSettings setDisableExactOnAttributes(
    List<String> disableExactOnAttributes
  ) {
    this.disableExactOnAttributes = disableExactOnAttributes;
    return this;
  }

  public IndexSettings addDisableExactOnAttributesItem(
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
  public List<String> getDisableExactOnAttributes() {
    return disableExactOnAttributes;
  }

  public IndexSettings setExactOnSingleWordQuery(
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
  public ExactOnSingleWordQueryEnum getExactOnSingleWordQuery() {
    return exactOnSingleWordQuery;
  }

  public IndexSettings setAlternativesAsExact(
    List<AlternativesAsExactEnum> alternativesAsExact
  ) {
    this.alternativesAsExact = alternativesAsExact;
    return this;
  }

  public IndexSettings addAlternativesAsExactItem(
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
  public List<AlternativesAsExactEnum> getAlternativesAsExact() {
    return alternativesAsExact;
  }

  public IndexSettings setAdvancedSyntaxFeatures(
    List<AdvancedSyntaxFeaturesEnum> advancedSyntaxFeatures
  ) {
    this.advancedSyntaxFeatures = advancedSyntaxFeatures;
    return this;
  }

  public IndexSettings addAdvancedSyntaxFeaturesItem(
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
  public List<AdvancedSyntaxFeaturesEnum> getAdvancedSyntaxFeatures() {
    return advancedSyntaxFeatures;
  }

  public IndexSettings setDistinct(Integer distinct) {
    this.distinct = distinct;
    return this;
  }

  /**
   * Enables de-duplication or grouping of results. minimum: 0 maximum: 4
   *
   * @return distinct
   */
  @javax.annotation.Nullable
  public Integer getDistinct() {
    return distinct;
  }

  public IndexSettings setSynonyms(Boolean synonyms) {
    this.synonyms = synonyms;
    return this;
  }

  /**
   * Whether to take into account an index's synonyms for a particular search.
   *
   * @return synonyms
   */
  @javax.annotation.Nullable
  public Boolean getSynonyms() {
    return synonyms;
  }

  public IndexSettings setReplaceSynonymsInHighlight(
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
  public Boolean getReplaceSynonymsInHighlight() {
    return replaceSynonymsInHighlight;
  }

  public IndexSettings setMinProximity(Integer minProximity) {
    this.minProximity = minProximity;
    return this;
  }

  /**
   * Precision of the proximity ranking criterion. minimum: 1 maximum: 7
   *
   * @return minProximity
   */
  @javax.annotation.Nullable
  public Integer getMinProximity() {
    return minProximity;
  }

  public IndexSettings setResponseFields(List<String> responseFields) {
    this.responseFields = responseFields;
    return this;
  }

  public IndexSettings addResponseFieldsItem(String responseFieldsItem) {
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
  public List<String> getResponseFields() {
    return responseFields;
  }

  public IndexSettings setMaxFacetHits(Integer maxFacetHits) {
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
  public Integer getMaxFacetHits() {
    return maxFacetHits;
  }

  public IndexSettings setAttributeCriteriaComputedByMinProximity(
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
  public Boolean getAttributeCriteriaComputedByMinProximity() {
    return attributeCriteriaComputedByMinProximity;
  }

  public IndexSettings setRenderingContent(Object renderingContent) {
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
  public Object getRenderingContent() {
    return renderingContent;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    IndexSettings indexSettings = (IndexSettings) o;
    return (
      Objects.equals(this.replicas, indexSettings.replicas) &&
      Objects.equals(
        this.paginationLimitedTo,
        indexSettings.paginationLimitedTo
      ) &&
      Objects.equals(
        this.disableTypoToleranceOnWords,
        indexSettings.disableTypoToleranceOnWords
      ) &&
      Objects.equals(
        this.attributesToTransliterate,
        indexSettings.attributesToTransliterate
      ) &&
      Objects.equals(
        this.camelCaseAttributes,
        indexSettings.camelCaseAttributes
      ) &&
      Objects.equals(
        this.decompoundedAttributes,
        indexSettings.decompoundedAttributes
      ) &&
      Objects.equals(this.indexLanguages, indexSettings.indexLanguages) &&
      Objects.equals(this.filterPromotes, indexSettings.filterPromotes) &&
      Objects.equals(
        this.disablePrefixOnAttributes,
        indexSettings.disablePrefixOnAttributes
      ) &&
      Objects.equals(
        this.allowCompressionOfIntegerArray,
        indexSettings.allowCompressionOfIntegerArray
      ) &&
      Objects.equals(
        this.numericAttributesForFiltering,
        indexSettings.numericAttributesForFiltering
      ) &&
      Objects.equals(this.userData, indexSettings.userData) &&
      Objects.equals(
        this.searchableAttributes,
        indexSettings.searchableAttributes
      ) &&
      Objects.equals(
        this.attributesForFaceting,
        indexSettings.attributesForFaceting
      ) &&
      Objects.equals(
        this.unretrievableAttributes,
        indexSettings.unretrievableAttributes
      ) &&
      Objects.equals(
        this.attributesToRetrieve,
        indexSettings.attributesToRetrieve
      ) &&
      Objects.equals(
        this.restrictSearchableAttributes,
        indexSettings.restrictSearchableAttributes
      ) &&
      Objects.equals(this.ranking, indexSettings.ranking) &&
      Objects.equals(this.customRanking, indexSettings.customRanking) &&
      Objects.equals(
        this.relevancyStrictness,
        indexSettings.relevancyStrictness
      ) &&
      Objects.equals(
        this.attributesToHighlight,
        indexSettings.attributesToHighlight
      ) &&
      Objects.equals(
        this.attributesToSnippet,
        indexSettings.attributesToSnippet
      ) &&
      Objects.equals(this.highlightPreTag, indexSettings.highlightPreTag) &&
      Objects.equals(this.highlightPostTag, indexSettings.highlightPostTag) &&
      Objects.equals(
        this.snippetEllipsisText,
        indexSettings.snippetEllipsisText
      ) &&
      Objects.equals(
        this.restrictHighlightAndSnippetArrays,
        indexSettings.restrictHighlightAndSnippetArrays
      ) &&
      Objects.equals(this.hitsPerPage, indexSettings.hitsPerPage) &&
      Objects.equals(
        this.minWordSizefor1Typo,
        indexSettings.minWordSizefor1Typo
      ) &&
      Objects.equals(
        this.minWordSizefor2Typos,
        indexSettings.minWordSizefor2Typos
      ) &&
      Objects.equals(this.typoTolerance, indexSettings.typoTolerance) &&
      Objects.equals(
        this.allowTyposOnNumericTokens,
        indexSettings.allowTyposOnNumericTokens
      ) &&
      Objects.equals(
        this.disableTypoToleranceOnAttributes,
        indexSettings.disableTypoToleranceOnAttributes
      ) &&
      Objects.equals(this.separatorsToIndex, indexSettings.separatorsToIndex) &&
      Objects.equals(this.ignorePlurals, indexSettings.ignorePlurals) &&
      Objects.equals(this.removeStopWords, indexSettings.removeStopWords) &&
      Objects.equals(
        this.keepDiacriticsOnCharacters,
        indexSettings.keepDiacriticsOnCharacters
      ) &&
      Objects.equals(this.queryLanguages, indexSettings.queryLanguages) &&
      Objects.equals(this.decompoundQuery, indexSettings.decompoundQuery) &&
      Objects.equals(this.enableRules, indexSettings.enableRules) &&
      Objects.equals(
        this.enablePersonalization,
        indexSettings.enablePersonalization
      ) &&
      Objects.equals(this.queryType, indexSettings.queryType) &&
      Objects.equals(
        this.removeWordsIfNoResults,
        indexSettings.removeWordsIfNoResults
      ) &&
      Objects.equals(this.advancedSyntax, indexSettings.advancedSyntax) &&
      Objects.equals(this.optionalWords, indexSettings.optionalWords) &&
      Objects.equals(
        this.disableExactOnAttributes,
        indexSettings.disableExactOnAttributes
      ) &&
      Objects.equals(
        this.exactOnSingleWordQuery,
        indexSettings.exactOnSingleWordQuery
      ) &&
      Objects.equals(
        this.alternativesAsExact,
        indexSettings.alternativesAsExact
      ) &&
      Objects.equals(
        this.advancedSyntaxFeatures,
        indexSettings.advancedSyntaxFeatures
      ) &&
      Objects.equals(this.distinct, indexSettings.distinct) &&
      Objects.equals(this.synonyms, indexSettings.synonyms) &&
      Objects.equals(
        this.replaceSynonymsInHighlight,
        indexSettings.replaceSynonymsInHighlight
      ) &&
      Objects.equals(this.minProximity, indexSettings.minProximity) &&
      Objects.equals(this.responseFields, indexSettings.responseFields) &&
      Objects.equals(this.maxFacetHits, indexSettings.maxFacetHits) &&
      Objects.equals(
        this.attributeCriteriaComputedByMinProximity,
        indexSettings.attributeCriteriaComputedByMinProximity
      ) &&
      Objects.equals(this.renderingContent, indexSettings.renderingContent)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      replicas,
      paginationLimitedTo,
      disableTypoToleranceOnWords,
      attributesToTransliterate,
      camelCaseAttributes,
      decompoundedAttributes,
      indexLanguages,
      filterPromotes,
      disablePrefixOnAttributes,
      allowCompressionOfIntegerArray,
      numericAttributesForFiltering,
      userData,
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
    sb.append("class IndexSettings {\n");
    sb.append("    replicas: ").append(toIndentedString(replicas)).append("\n");
    sb
      .append("    paginationLimitedTo: ")
      .append(toIndentedString(paginationLimitedTo))
      .append("\n");
    sb
      .append("    disableTypoToleranceOnWords: ")
      .append(toIndentedString(disableTypoToleranceOnWords))
      .append("\n");
    sb
      .append("    attributesToTransliterate: ")
      .append(toIndentedString(attributesToTransliterate))
      .append("\n");
    sb
      .append("    camelCaseAttributes: ")
      .append(toIndentedString(camelCaseAttributes))
      .append("\n");
    sb
      .append("    decompoundedAttributes: ")
      .append(toIndentedString(decompoundedAttributes))
      .append("\n");
    sb
      .append("    indexLanguages: ")
      .append(toIndentedString(indexLanguages))
      .append("\n");
    sb
      .append("    filterPromotes: ")
      .append(toIndentedString(filterPromotes))
      .append("\n");
    sb
      .append("    disablePrefixOnAttributes: ")
      .append(toIndentedString(disablePrefixOnAttributes))
      .append("\n");
    sb
      .append("    allowCompressionOfIntegerArray: ")
      .append(toIndentedString(allowCompressionOfIntegerArray))
      .append("\n");
    sb
      .append("    numericAttributesForFiltering: ")
      .append(toIndentedString(numericAttributesForFiltering))
      .append("\n");
    sb.append("    userData: ").append(toIndentedString(userData)).append("\n");
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
