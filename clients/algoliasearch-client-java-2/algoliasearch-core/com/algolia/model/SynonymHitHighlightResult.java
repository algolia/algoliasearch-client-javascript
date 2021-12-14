package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Highlighted results */
@ApiModel(description = "Highlighted results")
public class SynonymHitHighlightResult {

  public static final String SERIALIZED_NAME_TYPE = "type";

  @SerializedName(SERIALIZED_NAME_TYPE)
  private HighlightResult type;

  public static final String SERIALIZED_NAME_SYNONYMS = "synonyms";

  @SerializedName(SERIALIZED_NAME_SYNONYMS)
  private List<HighlightResult> synonyms = null;

  public SynonymHitHighlightResult type(HighlightResult type) {
    this.type = type;
    return this;
  }

  /**
   * Get type
   *
   * @return type
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "")
  public HighlightResult getType() {
    return type;
  }

  public void setType(HighlightResult type) {
    this.type = type;
  }

  public SynonymHitHighlightResult synonyms(List<HighlightResult> synonyms) {
    this.synonyms = synonyms;
    return this;
  }

  public SynonymHitHighlightResult addSynonymsItem(
    HighlightResult synonymsItem
  ) {
    if (this.synonyms == null) {
      this.synonyms = new ArrayList<>();
    }
    this.synonyms.add(synonymsItem);
    return this;
  }

  /**
   * Get synonyms
   *
   * @return synonyms
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "")
  public List<HighlightResult> getSynonyms() {
    return synonyms;
  }

  public void setSynonyms(List<HighlightResult> synonyms) {
    this.synonyms = synonyms;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SynonymHitHighlightResult synonymHitHighlightResult = (SynonymHitHighlightResult) o;
    return (
      Objects.equals(this.type, synonymHitHighlightResult.type) &&
      Objects.equals(this.synonyms, synonymHitHighlightResult.synonyms)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(type, synonyms);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SynonymHitHighlightResult {\n");
    sb.append("    type: ").append(toIndentedString(type)).append("\n");
    sb.append("    synonyms: ").append(toIndentedString(synonyms)).append("\n");
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
