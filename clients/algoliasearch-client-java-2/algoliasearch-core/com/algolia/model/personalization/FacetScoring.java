package com.algolia.model.personalization;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** FacetScoring */
public class FacetScoring {

  @SerializedName("score")
  private Integer score;

  @SerializedName("facetName")
  private String facetName;

  public FacetScoring setScore(Integer score) {
    this.score = score;
    return this;
  }

  /**
   * The score for the event.
   *
   * @return score
   */
  @javax.annotation.Nonnull
  public Integer getScore() {
    return score;
  }

  public FacetScoring setFacetName(String facetName) {
    this.facetName = facetName;
    return this;
  }

  /**
   * The name of the facet.
   *
   * @return facetName
   */
  @javax.annotation.Nonnull
  public String getFacetName() {
    return facetName;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    FacetScoring facetScoring = (FacetScoring) o;
    return (
      Objects.equals(this.score, facetScoring.score) &&
      Objects.equals(this.facetName, facetScoring.facetName)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(score, facetName);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class FacetScoring {\n");
    sb.append("    score: ").append(toIndentedString(score)).append("\n");
    sb
      .append("    facetName: ")
      .append(toIndentedString(facetName))
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
