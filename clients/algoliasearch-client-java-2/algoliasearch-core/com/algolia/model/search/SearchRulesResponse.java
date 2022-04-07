package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** SearchRulesResponse */
public class SearchRulesResponse {

  @SerializedName("hits")
  private List<Rule> hits = new ArrayList<>();

  @SerializedName("nbHits")
  private Integer nbHits;

  @SerializedName("page")
  private Integer page;

  @SerializedName("nbPages")
  private Integer nbPages;

  public SearchRulesResponse setHits(List<Rule> hits) {
    this.hits = hits;
    return this;
  }

  public SearchRulesResponse addHitsItem(Rule hitsItem) {
    this.hits.add(hitsItem);
    return this;
  }

  /**
   * Fetched rules.
   *
   * @return hits
   */
  @javax.annotation.Nonnull
  public List<Rule> getHits() {
    return hits;
  }

  public SearchRulesResponse setNbHits(Integer nbHits) {
    this.nbHits = nbHits;
    return this;
  }

  /**
   * Number of fetched rules.
   *
   * @return nbHits
   */
  @javax.annotation.Nonnull
  public Integer getNbHits() {
    return nbHits;
  }

  public SearchRulesResponse setPage(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Current page.
   *
   * @return page
   */
  @javax.annotation.Nonnull
  public Integer getPage() {
    return page;
  }

  public SearchRulesResponse setNbPages(Integer nbPages) {
    this.nbPages = nbPages;
    return this;
  }

  /**
   * Number of pages.
   *
   * @return nbPages
   */
  @javax.annotation.Nonnull
  public Integer getNbPages() {
    return nbPages;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchRulesResponse searchRulesResponse = (SearchRulesResponse) o;
    return (
      Objects.equals(this.hits, searchRulesResponse.hits) &&
      Objects.equals(this.nbHits, searchRulesResponse.nbHits) &&
      Objects.equals(this.page, searchRulesResponse.page) &&
      Objects.equals(this.nbPages, searchRulesResponse.nbPages)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(hits, nbHits, page, nbPages);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchRulesResponse {\n");
    sb.append("    hits: ").append(toIndentedString(hits)).append("\n");
    sb.append("    nbHits: ").append(toIndentedString(nbHits)).append("\n");
    sb.append("    page: ").append(toIndentedString(page)).append("\n");
    sb.append("    nbPages: ").append(toIndentedString(nbPages)).append("\n");
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
