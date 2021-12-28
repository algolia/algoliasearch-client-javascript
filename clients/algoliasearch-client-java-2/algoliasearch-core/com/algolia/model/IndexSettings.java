package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/** The Algolia index settings. */
@ApiModel(description = "The Algolia index settings.")
public class IndexSettings {

  public static final String SERIALIZED_NAME_REPLICAS = "replicas";

  @SerializedName(SERIALIZED_NAME_REPLICAS)
  private List<String> replicas = null;

  public static final String SERIALIZED_NAME_PAGINATION_LIMITED_TO =
    "paginationLimitedTo";

  @SerializedName(SERIALIZED_NAME_PAGINATION_LIMITED_TO)
  private Integer paginationLimitedTo = 1000;

  public static final String SERIALIZED_NAME_DISABLE_TYPO_TOLERANCE_ON_WORDS =
    "disableTypoToleranceOnWords";

  @SerializedName(SERIALIZED_NAME_DISABLE_TYPO_TOLERANCE_ON_WORDS)
  private List<String> disableTypoToleranceOnWords = null;

  public static final String SERIALIZED_NAME_ATTRIBUTES_TO_TRANSLITERATE =
    "attributesToTransliterate";

  @SerializedName(SERIALIZED_NAME_ATTRIBUTES_TO_TRANSLITERATE)
  private List<String> attributesToTransliterate = null;

  public static final String SERIALIZED_NAME_CAMEL_CASE_ATTRIBUTES =
    "camelCaseAttributes";

  @SerializedName(SERIALIZED_NAME_CAMEL_CASE_ATTRIBUTES)
  private List<String> camelCaseAttributes = null;

  public static final String SERIALIZED_NAME_DECOMPOUNDED_ATTRIBUTES =
    "decompoundedAttributes";

  @SerializedName(SERIALIZED_NAME_DECOMPOUNDED_ATTRIBUTES)
  private Map<String, Object> decompoundedAttributes = null;

  public static final String SERIALIZED_NAME_INDEX_LANGUAGES = "indexLanguages";

  @SerializedName(SERIALIZED_NAME_INDEX_LANGUAGES)
  private List<String> indexLanguages = null;

  public static final String SERIALIZED_NAME_FILTER_PROMOTES = "filterPromotes";

  @SerializedName(SERIALIZED_NAME_FILTER_PROMOTES)
  private Boolean filterPromotes = false;

  public static final String SERIALIZED_NAME_DISABLE_PREFIX_ON_ATTRIBUTES =
    "disablePrefixOnAttributes";

  @SerializedName(SERIALIZED_NAME_DISABLE_PREFIX_ON_ATTRIBUTES)
  private List<String> disablePrefixOnAttributes = null;

  public static final String SERIALIZED_NAME_ALLOW_COMPRESSION_OF_INTEGER_ARRAY =
    "allowCompressionOfIntegerArray";

  @SerializedName(SERIALIZED_NAME_ALLOW_COMPRESSION_OF_INTEGER_ARRAY)
  private Boolean allowCompressionOfIntegerArray = false;

  public static final String SERIALIZED_NAME_NUMERIC_ATTRIBUTES_FOR_FILTERING =
    "numericAttributesForFiltering";

  @SerializedName(SERIALIZED_NAME_NUMERIC_ATTRIBUTES_FOR_FILTERING)
  private List<String> numericAttributesForFiltering = null;

  public static final String SERIALIZED_NAME_USER_DATA = "userData";

  @SerializedName(SERIALIZED_NAME_USER_DATA)
  private Map<String, Object> userData = null;

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

  public IndexSettings replicas(List<String> replicas) {
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
  @ApiModelProperty(value = "Creates replicas, exact copies of an index.")
  public List<String> getReplicas() {
    return replicas;
  }

  public void setReplicas(List<String> replicas) {
    this.replicas = replicas;
  }

  public IndexSettings paginationLimitedTo(Integer paginationLimitedTo) {
    this.paginationLimitedTo = paginationLimitedTo;
    return this;
  }

  /**
   * Set the maximum number of hits accessible via pagination.
   *
   * @return paginationLimitedTo
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Set the maximum number of hits accessible via pagination."
  )
  public Integer getPaginationLimitedTo() {
    return paginationLimitedTo;
  }

  public void setPaginationLimitedTo(Integer paginationLimitedTo) {
    this.paginationLimitedTo = paginationLimitedTo;
  }

  public IndexSettings disableTypoToleranceOnWords(
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
  @ApiModelProperty(
    value = "A list of words for which you want to turn off typo tolerance."
  )
  public List<String> getDisableTypoToleranceOnWords() {
    return disableTypoToleranceOnWords;
  }

  public void setDisableTypoToleranceOnWords(
    List<String> disableTypoToleranceOnWords
  ) {
    this.disableTypoToleranceOnWords = disableTypoToleranceOnWords;
  }

  public IndexSettings attributesToTransliterate(
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
  @ApiModelProperty(
    value = "Specify on which attributes to apply transliteration."
  )
  public List<String> getAttributesToTransliterate() {
    return attributesToTransliterate;
  }

  public void setAttributesToTransliterate(
    List<String> attributesToTransliterate
  ) {
    this.attributesToTransliterate = attributesToTransliterate;
  }

  public IndexSettings camelCaseAttributes(List<String> camelCaseAttributes) {
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
  @ApiModelProperty(
    value = "List of attributes on which to do a decomposition of camel case words."
  )
  public List<String> getCamelCaseAttributes() {
    return camelCaseAttributes;
  }

  public void setCamelCaseAttributes(List<String> camelCaseAttributes) {
    this.camelCaseAttributes = camelCaseAttributes;
  }

  public IndexSettings decompoundedAttributes(
    Map<String, Object> decompoundedAttributes
  ) {
    this.decompoundedAttributes = decompoundedAttributes;
    return this;
  }

  public IndexSettings putDecompoundedAttributesItem(
    String key,
    Object decompoundedAttributesItem
  ) {
    if (this.decompoundedAttributes == null) {
      this.decompoundedAttributes = new HashMap<>();
    }
    this.decompoundedAttributes.put(key, decompoundedAttributesItem);
    return this;
  }

  /**
   * Specify on which attributes in your index Algolia should apply word segmentation, also known as
   * decompounding.
   *
   * @return decompoundedAttributes
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Specify on which attributes in your index Algolia should apply word segmentation, also" +
    " known as decompounding."
  )
  public Map<String, Object> getDecompoundedAttributes() {
    return decompoundedAttributes;
  }

  public void setDecompoundedAttributes(
    Map<String, Object> decompoundedAttributes
  ) {
    this.decompoundedAttributes = decompoundedAttributes;
  }

  public IndexSettings indexLanguages(List<String> indexLanguages) {
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
  @ApiModelProperty(
    value = "Sets the languages at the index level for language-specific processing such as" +
    " tokenization and normalization."
  )
  public List<String> getIndexLanguages() {
    return indexLanguages;
  }

  public void setIndexLanguages(List<String> indexLanguages) {
    this.indexLanguages = indexLanguages;
  }

  public IndexSettings filterPromotes(Boolean filterPromotes) {
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
  @ApiModelProperty(
    value = "Whether promoted results should match the filters of the current search, except for" +
    " geographic filters."
  )
  public Boolean getFilterPromotes() {
    return filterPromotes;
  }

  public void setFilterPromotes(Boolean filterPromotes) {
    this.filterPromotes = filterPromotes;
  }

  public IndexSettings disablePrefixOnAttributes(
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
  @ApiModelProperty(
    value = "List of attributes on which you want to disable prefix matching."
  )
  public List<String> getDisablePrefixOnAttributes() {
    return disablePrefixOnAttributes;
  }

  public void setDisablePrefixOnAttributes(
    List<String> disablePrefixOnAttributes
  ) {
    this.disablePrefixOnAttributes = disablePrefixOnAttributes;
  }

  public IndexSettings allowCompressionOfIntegerArray(
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
  @ApiModelProperty(value = "Enables compression of large integer arrays.")
  public Boolean getAllowCompressionOfIntegerArray() {
    return allowCompressionOfIntegerArray;
  }

  public void setAllowCompressionOfIntegerArray(
    Boolean allowCompressionOfIntegerArray
  ) {
    this.allowCompressionOfIntegerArray = allowCompressionOfIntegerArray;
  }

  public IndexSettings numericAttributesForFiltering(
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
  @ApiModelProperty(
    value = "List of numeric attributes that can be used as numerical filters."
  )
  public List<String> getNumericAttributesForFiltering() {
    return numericAttributesForFiltering;
  }

  public void setNumericAttributesForFiltering(
    List<String> numericAttributesForFiltering
  ) {
    this.numericAttributesForFiltering = numericAttributesForFiltering;
  }

  public IndexSettings userData(Map<String, Object> userData) {
    this.userData = userData;
    return this;
  }

  public IndexSettings putUserDataItem(String key, Object userDataItem) {
    if (this.userData == null) {
      this.userData = new HashMap<>();
    }
    this.userData.put(key, userDataItem);
    return this;
  }

  /**
   * Lets you store custom data in your indices.
   *
   * @return userData
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Lets you store custom data in your indices.")
  public Map<String, Object> getUserData() {
    return userData;
  }

  public void setUserData(Map<String, Object> userData) {
    this.userData = userData;
  }

  public IndexSettings searchableAttributes(List<String> searchableAttributes) {
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
  @ApiModelProperty(
    value = "The complete list of attributes used for searching."
  )
  public List<String> getSearchableAttributes() {
    return searchableAttributes;
  }

  public void setSearchableAttributes(List<String> searchableAttributes) {
    this.searchableAttributes = searchableAttributes;
  }

  public IndexSettings attributesForFaceting(
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
  @ApiModelProperty(
    value = "The complete list of attributes that will be used for faceting."
  )
  public List<String> getAttributesForFaceting() {
    return attributesForFaceting;
  }

  public void setAttributesForFaceting(List<String> attributesForFaceting) {
    this.attributesForFaceting = attributesForFaceting;
  }

  public IndexSettings unretrievableAttributes(
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
  @ApiModelProperty(
    value = "List of attributes that can't be retrieved at query time."
  )
  public List<String> getUnretrievableAttributes() {
    return unretrievableAttributes;
  }

  public void setUnretrievableAttributes(List<String> unretrievableAttributes) {
    this.unretrievableAttributes = unretrievableAttributes;
  }

  public IndexSettings attributesToRetrieve(List<String> attributesToRetrieve) {
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
  @ApiModelProperty(
    value = "This parameter controls which attributes to retrieve and which not to retrieve."
  )
  public List<String> getAttributesToRetrieve() {
    return attributesToRetrieve;
  }

  public void setAttributesToRetrieve(List<String> attributesToRetrieve) {
    this.attributesToRetrieve = attributesToRetrieve;
  }

  public IndexSettings restrictSearchableAttributes(
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

  public IndexSettings ranking(List<String> ranking) {
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
  @ApiModelProperty(value = "Controls how Algolia should sort your results.")
  public List<String> getRanking() {
    return ranking;
  }

  public void setRanking(List<String> ranking) {
    this.ranking = ranking;
  }

  public IndexSettings customRanking(List<String> customRanking) {
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
  @ApiModelProperty(value = "Specifies the custom ranking criterion.")
  public List<String> getCustomRanking() {
    return customRanking;
  }

  public void setCustomRanking(List<String> customRanking) {
    this.customRanking = customRanking;
  }

  public IndexSettings relevancyStrictness(Integer relevancyStrictness) {
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

  public IndexSettings attributesToHighlight(
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
  @ApiModelProperty(value = "List of attributes to highlight.")
  public List<String> getAttributesToHighlight() {
    return attributesToHighlight;
  }

  public void setAttributesToHighlight(List<String> attributesToHighlight) {
    this.attributesToHighlight = attributesToHighlight;
  }

  public IndexSettings attributesToSnippet(List<String> attributesToSnippet) {
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
  @ApiModelProperty(
    value = "List of attributes to snippet, with an optional maximum number of words to snippet."
  )
  public List<String> getAttributesToSnippet() {
    return attributesToSnippet;
  }

  public void setAttributesToSnippet(List<String> attributesToSnippet) {
    this.attributesToSnippet = attributesToSnippet;
  }

  public IndexSettings highlightPreTag(String highlightPreTag) {
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

  public IndexSettings highlightPostTag(String highlightPostTag) {
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

  public IndexSettings snippetEllipsisText(String snippetEllipsisText) {
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

  public IndexSettings restrictHighlightAndSnippetArrays(
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

  public IndexSettings hitsPerPage(Integer hitsPerPage) {
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

  public IndexSettings minWordSizefor1Typo(Integer minWordSizefor1Typo) {
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

  public IndexSettings minWordSizefor2Typos(Integer minWordSizefor2Typos) {
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

  public IndexSettings typoTolerance(TypoToleranceEnum typoTolerance) {
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

  public IndexSettings allowTyposOnNumericTokens(
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

  public IndexSettings disableTypoToleranceOnAttributes(
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

  public IndexSettings separatorsToIndex(String separatorsToIndex) {
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

  public IndexSettings ignorePlurals(String ignorePlurals) {
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

  public IndexSettings removeStopWords(String removeStopWords) {
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

  public IndexSettings keepDiacriticsOnCharacters(
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

  public IndexSettings queryLanguages(List<String> queryLanguages) {
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

  public IndexSettings decompoundQuery(Boolean decompoundQuery) {
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

  public IndexSettings enableRules(Boolean enableRules) {
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

  public IndexSettings enablePersonalization(Boolean enablePersonalization) {
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

  public IndexSettings queryType(QueryTypeEnum queryType) {
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

  public IndexSettings removeWordsIfNoResults(
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

  public IndexSettings advancedSyntax(Boolean advancedSyntax) {
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

  public IndexSettings optionalWords(List<String> optionalWords) {
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
  @ApiModelProperty(
    value = "A list of words that should be considered as optional when found in the query."
  )
  public List<String> getOptionalWords() {
    return optionalWords;
  }

  public void setOptionalWords(List<String> optionalWords) {
    this.optionalWords = optionalWords;
  }

  public IndexSettings disableExactOnAttributes(
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

  public IndexSettings exactOnSingleWordQuery(
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

  public IndexSettings alternativesAsExact(
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

  public IndexSettings advancedSyntaxFeatures(
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

  public IndexSettings distinct(Integer distinct) {
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

  public IndexSettings synonyms(Boolean synonyms) {
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

  public IndexSettings replaceSynonymsInHighlight(
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

  public IndexSettings minProximity(Integer minProximity) {
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

  public IndexSettings responseFields(List<String> responseFields) {
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

  public IndexSettings maxFacetHits(Integer maxFacetHits) {
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

  public IndexSettings attributeCriteriaComputedByMinProximity(
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

  public IndexSettings renderingContent(Object renderingContent) {
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
