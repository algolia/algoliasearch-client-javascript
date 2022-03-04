package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** Automatic facet Filter. */
public class AutomaticFacetFilter {

  @SerializedName("facet")
  private String facet;

  @SerializedName("score")
  private Integer score = 1;

  @SerializedName("disjunctive")
  private Boolean disjunctive = false;

  public AutomaticFacetFilter facet(String facet) {
    this.facet = facet;
    return this;
  }

  /**
   * Attribute to filter on. This must match a facet placeholder in the Rule's pattern.
   *
   * @return facet
   */
  @javax.annotation.Nonnull
  public String getFacet() {
    return facet;
  }

  public void setFacet(String facet) {
    this.facet = facet;
  }

  public AutomaticFacetFilter score(Integer score) {
    this.score = score;
    return this;
  }

  /**
   * Score for the filter. Typically used for optional or disjunctive filters.
   *
   * @return score
   */
  @javax.annotation.Nullable
  public Integer getScore() {
    return score;
  }

  public void setScore(Integer score) {
    this.score = score;
  }

  public AutomaticFacetFilter disjunctive(Boolean disjunctive) {
    this.disjunctive = disjunctive;
    return this;
  }

  /**
   * Whether the filter is disjunctive (true) or conjunctive (false).
   *
   * @return disjunctive
   */
  @javax.annotation.Nullable
  public Boolean getDisjunctive() {
    return disjunctive;
  }

  public void setDisjunctive(Boolean disjunctive) {
    this.disjunctive = disjunctive;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    AutomaticFacetFilter automaticFacetFilter = (AutomaticFacetFilter) o;
    return (
      Objects.equals(this.facet, automaticFacetFilter.facet) &&
      Objects.equals(this.score, automaticFacetFilter.score) &&
      Objects.equals(this.disjunctive, automaticFacetFilter.disjunctive)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(facet, score, disjunctive);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class AutomaticFacetFilter {\n");
    sb.append("    facet: ").append(toIndentedString(facet)).append("\n");
    sb.append("    score: ").append(toIndentedString(score)).append("\n");
    sb
      .append("    disjunctive: ")
      .append(toIndentedString(disjunctive))
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
