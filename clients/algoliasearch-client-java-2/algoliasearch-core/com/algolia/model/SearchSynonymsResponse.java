package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

/** SearchSynonymsResponse */
public class SearchSynonymsResponse extends HashMap<String, Object> {

  public static final String SERIALIZED_NAME_HITS = "hits";

  @SerializedName(SERIALIZED_NAME_HITS)
  private List<SynonymHit> hits = new ArrayList<>();

  public static final String SERIALIZED_NAME_NB_HITS = "nbHits";

  @SerializedName(SERIALIZED_NAME_NB_HITS)
  private Integer nbHits;

  public SearchSynonymsResponse hits(List<SynonymHit> hits) {
    this.hits = hits;
    return this;
  }

  public SearchSynonymsResponse addHitsItem(SynonymHit hitsItem) {
    this.hits.add(hitsItem);
    return this;
  }

  /**
   * Array of synonym objects.
   *
   * @return hits
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "Array of synonym objects.")
  public List<SynonymHit> getHits() {
    return hits;
  }

  public void setHits(List<SynonymHit> hits) {
    this.hits = hits;
  }

  public SearchSynonymsResponse nbHits(Integer nbHits) {
    this.nbHits = nbHits;
    return this;
  }

  /**
   * Number of hits that the search query matched.
   *
   * @return nbHits
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    example = "20",
    required = true,
    value = "Number of hits that the search query matched."
  )
  public Integer getNbHits() {
    return nbHits;
  }

  public void setNbHits(Integer nbHits) {
    this.nbHits = nbHits;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchSynonymsResponse searchSynonymsResponse = (SearchSynonymsResponse) o;
    return (
      Objects.equals(this.hits, searchSynonymsResponse.hits) &&
      Objects.equals(this.nbHits, searchSynonymsResponse.nbHits) &&
      super.equals(o)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(hits, nbHits, super.hashCode());
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchSynonymsResponse {\n");
    sb.append("    ").append(toIndentedString(super.toString())).append("\n");
    sb.append("    hits: ").append(toIndentedString(hits)).append("\n");
    sb.append("    nbHits: ").append(toIndentedString(nbHits)).append("\n");
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
