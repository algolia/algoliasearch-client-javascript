package com.algolia.model.querySuggestions;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** QuerySuggestionsIndexWithIndexParam */
public class QuerySuggestionsIndexWithIndexParam {

  @SerializedName("sourceIndices")
  private List<SourceIndex> sourceIndices = new ArrayList<>();

  @SerializedName("languages")
  private List<String> languages = null;

  @SerializedName("exclude")
  private List<String> exclude = null;

  @SerializedName("indexName")
  private String indexName;

  public QuerySuggestionsIndexWithIndexParam setSourceIndices(
    List<SourceIndex> sourceIndices
  ) {
    this.sourceIndices = sourceIndices;
    return this;
  }

  public QuerySuggestionsIndexWithIndexParam addSourceIndicesItem(
    SourceIndex sourceIndicesItem
  ) {
    this.sourceIndices.add(sourceIndicesItem);
    return this;
  }

  /**
   * List of source indices used to generate a Query Suggestions index.
   *
   * @return sourceIndices
   */
  @javax.annotation.Nonnull
  public List<SourceIndex> getSourceIndices() {
    return sourceIndices;
  }

  public QuerySuggestionsIndexWithIndexParam setLanguages(
    List<String> languages
  ) {
    this.languages = languages;
    return this;
  }

  public QuerySuggestionsIndexWithIndexParam addLanguagesItem(
    String languagesItem
  ) {
    if (this.languages == null) {
      this.languages = new ArrayList<>();
    }
    this.languages.add(languagesItem);
    return this;
  }

  /**
   * De-duplicate singular and plural suggestions. For example, let's say your index contains
   * English content, and that two suggestions “shoe” and “shoes” end up in your Query Suggestions
   * index. If the English language is configured, only the most popular of those two suggestions
   * would remain.
   *
   * @return languages
   */
  @javax.annotation.Nullable
  public List<String> getLanguages() {
    return languages;
  }

  public QuerySuggestionsIndexWithIndexParam setExclude(List<String> exclude) {
    this.exclude = exclude;
    return this;
  }

  public QuerySuggestionsIndexWithIndexParam addExcludeItem(
    String excludeItem
  ) {
    if (this.exclude == null) {
      this.exclude = new ArrayList<>();
    }
    this.exclude.add(excludeItem);
    return this;
  }

  /**
   * List of words and patterns to exclude from the Query Suggestions index.
   *
   * @return exclude
   */
  @javax.annotation.Nullable
  public List<String> getExclude() {
    return exclude;
  }

  public QuerySuggestionsIndexWithIndexParam setIndexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * Index name to target.
   *
   * @return indexName
   */
  @javax.annotation.Nonnull
  public String getIndexName() {
    return indexName;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    QuerySuggestionsIndexWithIndexParam querySuggestionsIndexWithIndexParam = (QuerySuggestionsIndexWithIndexParam) o;
    return (
      Objects.equals(
        this.sourceIndices,
        querySuggestionsIndexWithIndexParam.sourceIndices
      ) &&
      Objects.equals(
        this.languages,
        querySuggestionsIndexWithIndexParam.languages
      ) &&
      Objects.equals(
        this.exclude,
        querySuggestionsIndexWithIndexParam.exclude
      ) &&
      Objects.equals(
        this.indexName,
        querySuggestionsIndexWithIndexParam.indexName
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(sourceIndices, languages, exclude, indexName);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class QuerySuggestionsIndexWithIndexParam {\n");
    sb
      .append("    sourceIndices: ")
      .append(toIndentedString(sourceIndices))
      .append("\n");
    sb
      .append("    languages: ")
      .append(toIndentedString(languages))
      .append("\n");
    sb.append("    exclude: ").append(toIndentedString(exclude)).append("\n");
    sb
      .append("    indexName: ")
      .append(toIndentedString(indexName))
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
