package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.HashMap;
import java.util.Objects;

/** A single record. */
public class Record extends HashMap<String, Object> {

  @SerializedName("objectID")
  private String objectID;

  @SerializedName("_highlightResult")
  private HighlightResult highlightResult;

  @SerializedName("_snippetResult")
  private SnippetResult snippetResult;

  @SerializedName("_rankingInfo")
  private RankingInfo rankingInfo;

  @SerializedName("_distinctSeqID")
  private Integer distinctSeqID;

  public Record objectID(String objectID) {
    this.objectID = objectID;
    return this;
  }

  /**
   * Unique identifier of the object.
   *
   * @return objectID
   */
  @javax.annotation.Nonnull
  public String getObjectID() {
    return objectID;
  }

  public void setObjectID(String objectID) {
    this.objectID = objectID;
  }

  public Record highlightResult(HighlightResult highlightResult) {
    this.highlightResult = highlightResult;
    return this;
  }

  /**
   * Get highlightResult
   *
   * @return highlightResult
   */
  @javax.annotation.Nullable
  public HighlightResult getHighlightResult() {
    return highlightResult;
  }

  public void setHighlightResult(HighlightResult highlightResult) {
    this.highlightResult = highlightResult;
  }

  public Record snippetResult(SnippetResult snippetResult) {
    this.snippetResult = snippetResult;
    return this;
  }

  /**
   * Get snippetResult
   *
   * @return snippetResult
   */
  @javax.annotation.Nullable
  public SnippetResult getSnippetResult() {
    return snippetResult;
  }

  public void setSnippetResult(SnippetResult snippetResult) {
    this.snippetResult = snippetResult;
  }

  public Record rankingInfo(RankingInfo rankingInfo) {
    this.rankingInfo = rankingInfo;
    return this;
  }

  /**
   * Get rankingInfo
   *
   * @return rankingInfo
   */
  @javax.annotation.Nullable
  public RankingInfo getRankingInfo() {
    return rankingInfo;
  }

  public void setRankingInfo(RankingInfo rankingInfo) {
    this.rankingInfo = rankingInfo;
  }

  public Record distinctSeqID(Integer distinctSeqID) {
    this.distinctSeqID = distinctSeqID;
    return this;
  }

  /**
   * Get distinctSeqID
   *
   * @return distinctSeqID
   */
  @javax.annotation.Nullable
  public Integer getDistinctSeqID() {
    return distinctSeqID;
  }

  public void setDistinctSeqID(Integer distinctSeqID) {
    this.distinctSeqID = distinctSeqID;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Record record = (Record) o;
    return (
      Objects.equals(this.objectID, record.objectID) &&
      Objects.equals(this.highlightResult, record.highlightResult) &&
      Objects.equals(this.snippetResult, record.snippetResult) &&
      Objects.equals(this.rankingInfo, record.rankingInfo) &&
      Objects.equals(this.distinctSeqID, record.distinctSeqID) &&
      super.equals(o)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      objectID,
      highlightResult,
      snippetResult,
      rankingInfo,
      distinctSeqID,
      super.hashCode()
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Record {\n");
    sb.append("    ").append(toIndentedString(super.toString())).append("\n");
    sb.append("    objectID: ").append(toIndentedString(objectID)).append("\n");
    sb
      .append("    highlightResult: ")
      .append(toIndentedString(highlightResult))
      .append("\n");
    sb
      .append("    snippetResult: ")
      .append(toIndentedString(snippetResult))
      .append("\n");
    sb
      .append("    rankingInfo: ")
      .append(toIndentedString(rankingInfo))
      .append("\n");
    sb
      .append("    distinctSeqID: ")
      .append(toIndentedString(distinctSeqID))
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
