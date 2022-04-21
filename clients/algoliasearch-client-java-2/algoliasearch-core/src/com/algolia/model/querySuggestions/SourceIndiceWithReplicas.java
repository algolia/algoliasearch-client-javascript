package com.algolia.model.querySuggestions;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Source indice with replicas used to generate a Query Suggestions index. */
public class SourceIndiceWithReplicas {

  @SerializedName("replicas")
  private Boolean replicas;

  @SerializedName("indexName")
  private String indexName;

  @SerializedName("analyticsTags")
  private List<String> analyticsTags = new ArrayList<>();

  @SerializedName("facets")
  private List<Object> facets = new ArrayList<>();

  @SerializedName("minHits")
  private Integer minHits;

  @SerializedName("minLetters")
  private Integer minLetters;

  @SerializedName("generate")
  private List<List<String>> generate = new ArrayList<>();

  @SerializedName("external")
  private List<SourceIndexExternal> external = new ArrayList<>();

  public SourceIndiceWithReplicas setReplicas(Boolean replicas) {
    this.replicas = replicas;
    return this;
  }

  /**
   * true if the Query Suggestions index is a replicas.
   *
   * @return replicas
   */
  @javax.annotation.Nonnull
  public Boolean getReplicas() {
    return replicas;
  }

  public SourceIndiceWithReplicas setIndexName(String indexName) {
    this.indexName = indexName;
    return this;
  }

  /**
   * Source index name.
   *
   * @return indexName
   */
  @javax.annotation.Nonnull
  public String getIndexName() {
    return indexName;
  }

  public SourceIndiceWithReplicas setAnalyticsTags(List<String> analyticsTags) {
    this.analyticsTags = analyticsTags;
    return this;
  }

  public SourceIndiceWithReplicas addAnalyticsTagsItem(
    String analyticsTagsItem
  ) {
    this.analyticsTags.add(analyticsTagsItem);
    return this;
  }

  /**
   * List of analytics tags to filter the popular searches per tag.
   *
   * @return analyticsTags
   */
  @javax.annotation.Nonnull
  public List<String> getAnalyticsTags() {
    return analyticsTags;
  }

  public SourceIndiceWithReplicas setFacets(List<Object> facets) {
    this.facets = facets;
    return this;
  }

  public SourceIndiceWithReplicas addFacetsItem(Object facetsItem) {
    this.facets.add(facetsItem);
    return this;
  }

  /**
   * List of facets to define as categories for the query suggestions.
   *
   * @return facets
   */
  @javax.annotation.Nonnull
  public List<Object> getFacets() {
    return facets;
  }

  public SourceIndiceWithReplicas setMinHits(Integer minHits) {
    this.minHits = minHits;
    return this;
  }

  /**
   * Minimum number of hits (e.g., matching records in the source index) to generate a suggestions.
   *
   * @return minHits
   */
  @javax.annotation.Nonnull
  public Integer getMinHits() {
    return minHits;
  }

  public SourceIndiceWithReplicas setMinLetters(Integer minLetters) {
    this.minLetters = minLetters;
    return this;
  }

  /**
   * Minimum number of required letters for a suggestion to remain.
   *
   * @return minLetters
   */
  @javax.annotation.Nonnull
  public Integer getMinLetters() {
    return minLetters;
  }

  public SourceIndiceWithReplicas setGenerate(List<List<String>> generate) {
    this.generate = generate;
    return this;
  }

  public SourceIndiceWithReplicas addGenerateItem(List<String> generateItem) {
    this.generate.add(generateItem);
    return this;
  }

  /**
   * List of facet attributes used to generate Query Suggestions. The resulting suggestions are
   * every combination of the facets in the nested list (e.g., (facetA and facetB) and facetC).
   *
   * @return generate
   */
  @javax.annotation.Nonnull
  public List<List<String>> getGenerate() {
    return generate;
  }

  public SourceIndiceWithReplicas setExternal(
    List<SourceIndexExternal> external
  ) {
    this.external = external;
    return this;
  }

  public SourceIndiceWithReplicas addExternalItem(
    SourceIndexExternal externalItem
  ) {
    this.external.add(externalItem);
    return this;
  }

  /**
   * List of external indices to use to generate custom Query Suggestions.
   *
   * @return external
   */
  @javax.annotation.Nonnull
  public List<SourceIndexExternal> getExternal() {
    return external;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SourceIndiceWithReplicas sourceIndiceWithReplicas = (SourceIndiceWithReplicas) o;
    return (
      Objects.equals(this.replicas, sourceIndiceWithReplicas.replicas) &&
      Objects.equals(this.indexName, sourceIndiceWithReplicas.indexName) &&
      Objects.equals(
        this.analyticsTags,
        sourceIndiceWithReplicas.analyticsTags
      ) &&
      Objects.equals(this.facets, sourceIndiceWithReplicas.facets) &&
      Objects.equals(this.minHits, sourceIndiceWithReplicas.minHits) &&
      Objects.equals(this.minLetters, sourceIndiceWithReplicas.minLetters) &&
      Objects.equals(this.generate, sourceIndiceWithReplicas.generate) &&
      Objects.equals(this.external, sourceIndiceWithReplicas.external)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      replicas,
      indexName,
      analyticsTags,
      facets,
      minHits,
      minLetters,
      generate,
      external
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SourceIndiceWithReplicas {\n");
    sb.append("    replicas: ").append(toIndentedString(replicas)).append("\n");
    sb
      .append("    indexName: ")
      .append(toIndentedString(indexName))
      .append("\n");
    sb
      .append("    analyticsTags: ")
      .append(toIndentedString(analyticsTags))
      .append("\n");
    sb.append("    facets: ").append(toIndentedString(facets)).append("\n");
    sb.append("    minHits: ").append(toIndentedString(minHits)).append("\n");
    sb
      .append("    minLetters: ")
      .append(toIndentedString(minLetters))
      .append("\n");
    sb.append("    generate: ").append(toIndentedString(generate)).append("\n");
    sb.append("    external: ").append(toIndentedString(external)).append("\n");
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
