package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** BaseIndexSettings */
public class BaseIndexSettings {

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

  public BaseIndexSettings replicas(List<String> replicas) {
    this.replicas = replicas;
    return this;
  }

  public BaseIndexSettings addReplicasItem(String replicasItem) {
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

  public void setReplicas(List<String> replicas) {
    this.replicas = replicas;
  }

  public BaseIndexSettings paginationLimitedTo(Integer paginationLimitedTo) {
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

  public void setPaginationLimitedTo(Integer paginationLimitedTo) {
    this.paginationLimitedTo = paginationLimitedTo;
  }

  public BaseIndexSettings disableTypoToleranceOnWords(
    List<String> disableTypoToleranceOnWords
  ) {
    this.disableTypoToleranceOnWords = disableTypoToleranceOnWords;
    return this;
  }

  public BaseIndexSettings addDisableTypoToleranceOnWordsItem(
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

  public void setDisableTypoToleranceOnWords(
    List<String> disableTypoToleranceOnWords
  ) {
    this.disableTypoToleranceOnWords = disableTypoToleranceOnWords;
  }

  public BaseIndexSettings attributesToTransliterate(
    List<String> attributesToTransliterate
  ) {
    this.attributesToTransliterate = attributesToTransliterate;
    return this;
  }

  public BaseIndexSettings addAttributesToTransliterateItem(
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

  public void setAttributesToTransliterate(
    List<String> attributesToTransliterate
  ) {
    this.attributesToTransliterate = attributesToTransliterate;
  }

  public BaseIndexSettings camelCaseAttributes(
    List<String> camelCaseAttributes
  ) {
    this.camelCaseAttributes = camelCaseAttributes;
    return this;
  }

  public BaseIndexSettings addCamelCaseAttributesItem(
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

  public void setCamelCaseAttributes(List<String> camelCaseAttributes) {
    this.camelCaseAttributes = camelCaseAttributes;
  }

  public BaseIndexSettings decompoundedAttributes(
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

  public void setDecompoundedAttributes(Object decompoundedAttributes) {
    this.decompoundedAttributes = decompoundedAttributes;
  }

  public BaseIndexSettings indexLanguages(List<String> indexLanguages) {
    this.indexLanguages = indexLanguages;
    return this;
  }

  public BaseIndexSettings addIndexLanguagesItem(String indexLanguagesItem) {
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

  public void setIndexLanguages(List<String> indexLanguages) {
    this.indexLanguages = indexLanguages;
  }

  public BaseIndexSettings filterPromotes(Boolean filterPromotes) {
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

  public void setFilterPromotes(Boolean filterPromotes) {
    this.filterPromotes = filterPromotes;
  }

  public BaseIndexSettings disablePrefixOnAttributes(
    List<String> disablePrefixOnAttributes
  ) {
    this.disablePrefixOnAttributes = disablePrefixOnAttributes;
    return this;
  }

  public BaseIndexSettings addDisablePrefixOnAttributesItem(
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

  public void setDisablePrefixOnAttributes(
    List<String> disablePrefixOnAttributes
  ) {
    this.disablePrefixOnAttributes = disablePrefixOnAttributes;
  }

  public BaseIndexSettings allowCompressionOfIntegerArray(
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

  public void setAllowCompressionOfIntegerArray(
    Boolean allowCompressionOfIntegerArray
  ) {
    this.allowCompressionOfIntegerArray = allowCompressionOfIntegerArray;
  }

  public BaseIndexSettings numericAttributesForFiltering(
    List<String> numericAttributesForFiltering
  ) {
    this.numericAttributesForFiltering = numericAttributesForFiltering;
    return this;
  }

  public BaseIndexSettings addNumericAttributesForFilteringItem(
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

  public void setNumericAttributesForFiltering(
    List<String> numericAttributesForFiltering
  ) {
    this.numericAttributesForFiltering = numericAttributesForFiltering;
  }

  public BaseIndexSettings userData(Object userData) {
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

  public void setUserData(Object userData) {
    this.userData = userData;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BaseIndexSettings baseIndexSettings = (BaseIndexSettings) o;
    return (
      Objects.equals(this.replicas, baseIndexSettings.replicas) &&
      Objects.equals(
        this.paginationLimitedTo,
        baseIndexSettings.paginationLimitedTo
      ) &&
      Objects.equals(
        this.disableTypoToleranceOnWords,
        baseIndexSettings.disableTypoToleranceOnWords
      ) &&
      Objects.equals(
        this.attributesToTransliterate,
        baseIndexSettings.attributesToTransliterate
      ) &&
      Objects.equals(
        this.camelCaseAttributes,
        baseIndexSettings.camelCaseAttributes
      ) &&
      Objects.equals(
        this.decompoundedAttributes,
        baseIndexSettings.decompoundedAttributes
      ) &&
      Objects.equals(this.indexLanguages, baseIndexSettings.indexLanguages) &&
      Objects.equals(this.filterPromotes, baseIndexSettings.filterPromotes) &&
      Objects.equals(
        this.disablePrefixOnAttributes,
        baseIndexSettings.disablePrefixOnAttributes
      ) &&
      Objects.equals(
        this.allowCompressionOfIntegerArray,
        baseIndexSettings.allowCompressionOfIntegerArray
      ) &&
      Objects.equals(
        this.numericAttributesForFiltering,
        baseIndexSettings.numericAttributesForFiltering
      ) &&
      Objects.equals(this.userData, baseIndexSettings.userData)
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
      userData
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BaseIndexSettings {\n");
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
