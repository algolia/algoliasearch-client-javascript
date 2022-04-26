package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** Personalization */
public class Personalization {

  @SerializedName("filtersScore")
  private Integer filtersScore;

  @SerializedName("rankingScore")
  private Integer rankingScore;

  @SerializedName("score")
  private Integer score;

  public Personalization setFiltersScore(Integer filtersScore) {
    this.filtersScore = filtersScore;
    return this;
  }

  /**
   * The score of the filters.
   *
   * @return filtersScore
   */
  @javax.annotation.Nullable
  public Integer getFiltersScore() {
    return filtersScore;
  }

  public Personalization setRankingScore(Integer rankingScore) {
    this.rankingScore = rankingScore;
    return this;
  }

  /**
   * The score of the ranking.
   *
   * @return rankingScore
   */
  @javax.annotation.Nullable
  public Integer getRankingScore() {
    return rankingScore;
  }

  public Personalization setScore(Integer score) {
    this.score = score;
    return this;
  }

  /**
   * The score of the event.
   *
   * @return score
   */
  @javax.annotation.Nullable
  public Integer getScore() {
    return score;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Personalization personalization = (Personalization) o;
    return (
      Objects.equals(this.filtersScore, personalization.filtersScore) &&
      Objects.equals(this.rankingScore, personalization.rankingScore) &&
      Objects.equals(this.score, personalization.score)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(filtersScore, rankingScore, score);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Personalization {\n");
    sb
      .append("    filtersScore: ")
      .append(toIndentedString(filtersScore))
      .append("\n");
    sb
      .append("    rankingScore: ")
      .append(toIndentedString(rankingScore))
      .append("\n");
    sb.append("    score: ").append(toIndentedString(score)).append("\n");
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
