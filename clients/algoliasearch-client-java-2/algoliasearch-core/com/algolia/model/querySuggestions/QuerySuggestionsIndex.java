package com.algolia.model.querySuggestions;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** QuerySuggestionsIndex */
public class QuerySuggestionsIndex {

  @SerializedName("indexName")
  private String indexName;

  @SerializedName("sourceIndices")
  private List<SourceIndiceWithReplicas> sourceIndices = new ArrayList<>();

  @SerializedName("languages")
  private List<String> languages = new ArrayList<>();

  @SerializedName("exclude")
  private List<String> exclude = new ArrayList<>();

  public QuerySuggestionsIndex setIndexName(String indexName) {
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

  public QuerySuggestionsIndex setSourceIndices(
    List<SourceIndiceWithReplicas> sourceIndices
  ) {
    this.sourceIndices = sourceIndices;
    return this;
  }

  public QuerySuggestionsIndex addSourceIndicesItem(
    SourceIndiceWithReplicas sourceIndicesItem
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
  public List<SourceIndiceWithReplicas> getSourceIndices() {
    return sourceIndices;
  }

  public QuerySuggestionsIndex setLanguages(List<String> languages) {
    this.languages = languages;
    return this;
  }

  public QuerySuggestionsIndex addLanguagesItem(String languagesItem) {
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
  @javax.annotation.Nonnull
  public List<String> getLanguages() {
    return languages;
  }

  public QuerySuggestionsIndex setExclude(List<String> exclude) {
    this.exclude = exclude;
    return this;
  }

  public QuerySuggestionsIndex addExcludeItem(String excludeItem) {
    this.exclude.add(excludeItem);
    return this;
  }

  /**
   * List of words and patterns to exclude from the Query Suggestions index.
   *
   * @return exclude
   */
  @javax.annotation.Nonnull
  public List<String> getExclude() {
    return exclude;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    QuerySuggestionsIndex querySuggestionsIndex = (QuerySuggestionsIndex) o;
    return (
      Objects.equals(this.indexName, querySuggestionsIndex.indexName) &&
      Objects.equals(this.sourceIndices, querySuggestionsIndex.sourceIndices) &&
      Objects.equals(this.languages, querySuggestionsIndex.languages) &&
      Objects.equals(this.exclude, querySuggestionsIndex.exclude)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(indexName, sourceIndices, languages, exclude);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class QuerySuggestionsIndex {\n");
    sb
      .append("    indexName: ")
      .append(toIndentedString(indexName))
      .append("\n");
    sb
      .append("    sourceIndices: ")
      .append(toIndentedString(sourceIndices))
      .append("\n");
    sb
      .append("    languages: ")
      .append(toIndentedString(languages))
      .append("\n");
    sb.append("    exclude: ").append(toIndentedString(exclude)).append("\n");
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
