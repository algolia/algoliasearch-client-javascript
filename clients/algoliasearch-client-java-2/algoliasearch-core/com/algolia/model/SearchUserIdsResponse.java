package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** userIDs data. */
@ApiModel(description = "userIDs data.")
public class SearchUserIdsResponse {

  public static final String SERIALIZED_NAME_HITS = "hits";

  @SerializedName(SERIALIZED_NAME_HITS)
  private List<SearchUserIdsResponseHits> hits = new ArrayList<>();

  public static final String SERIALIZED_NAME_NB_HITS = "nbHits";

  @SerializedName(SERIALIZED_NAME_NB_HITS)
  private Integer nbHits;

  public static final String SERIALIZED_NAME_PAGE = "page";

  @SerializedName(SERIALIZED_NAME_PAGE)
  private Integer page = 0;

  public static final String SERIALIZED_NAME_HITS_PER_PAGE = "hitsPerPage";

  @SerializedName(SERIALIZED_NAME_HITS_PER_PAGE)
  private Integer hitsPerPage = 20;

  public static final String SERIALIZED_NAME_UPDATED_AT = "updatedAt";

  @SerializedName(SERIALIZED_NAME_UPDATED_AT)
  private OffsetDateTime updatedAt;

  public SearchUserIdsResponse hits(List<SearchUserIdsResponseHits> hits) {
    this.hits = hits;
    return this;
  }

  public SearchUserIdsResponse addHitsItem(SearchUserIdsResponseHits hitsItem) {
    this.hits.add(hitsItem);
    return this;
  }

  /**
   * List of user object matching the query.
   *
   * @return hits
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "List of user object matching the query."
  )
  public List<SearchUserIdsResponseHits> getHits() {
    return hits;
  }

  public void setHits(List<SearchUserIdsResponseHits> hits) {
    this.hits = hits;
  }

  public SearchUserIdsResponse nbHits(Integer nbHits) {
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

  public SearchUserIdsResponse page(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Specify the page to retrieve.
   *
   * @return page
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "Specify the page to retrieve.")
  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  public SearchUserIdsResponse hitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Maximum number of hits in a page. Minimum is 1, maximum is 1000.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Maximum number of hits in a page. Minimum is 1, maximum is 1000."
  )
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public void setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
  }

  public SearchUserIdsResponse updatedAt(OffsetDateTime updatedAt) {
    this.updatedAt = updatedAt;
    return this;
  }

  /**
   * Date of last update (ISO-8601 format).
   *
   * @return updatedAt
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(
    required = true,
    value = "Date of last update (ISO-8601 format)."
  )
  public OffsetDateTime getUpdatedAt() {
    return updatedAt;
  }

  public void setUpdatedAt(OffsetDateTime updatedAt) {
    this.updatedAt = updatedAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchUserIdsResponse searchUserIdsResponse = (SearchUserIdsResponse) o;
    return (
      Objects.equals(this.hits, searchUserIdsResponse.hits) &&
      Objects.equals(this.nbHits, searchUserIdsResponse.nbHits) &&
      Objects.equals(this.page, searchUserIdsResponse.page) &&
      Objects.equals(this.hitsPerPage, searchUserIdsResponse.hitsPerPage) &&
      Objects.equals(this.updatedAt, searchUserIdsResponse.updatedAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(hits, nbHits, page, hitsPerPage, updatedAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchUserIdsResponse {\n");
    sb.append("    hits: ").append(toIndentedString(hits)).append("\n");
    sb.append("    nbHits: ").append(toIndentedString(nbHits)).append("\n");
    sb.append("    page: ").append(toIndentedString(page)).append("\n");
    sb
      .append("    hitsPerPage: ")
      .append(toIndentedString(hitsPerPage))
      .append("\n");
    sb
      .append("    updatedAt: ")
      .append(toIndentedString(updatedAt))
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
