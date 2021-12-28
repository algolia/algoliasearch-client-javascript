package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.Objects;

/** The `searchDictionaryEntries` request. */
@ApiModel(description = "The `searchDictionaryEntries` request.")
public class SearchDictionaryEntries {

  public static final String SERIALIZED_NAME_QUERY = "query";

  @SerializedName(SERIALIZED_NAME_QUERY)
  private String query = "";

  public static final String SERIALIZED_NAME_PAGE = "page";

  @SerializedName(SERIALIZED_NAME_PAGE)
  private Integer page = 0;

  public static final String SERIALIZED_NAME_HITS_PER_PAGE = "hitsPerPage";

  @SerializedName(SERIALIZED_NAME_HITS_PER_PAGE)
  private Integer hitsPerPage = 20;

  public static final String SERIALIZED_NAME_LANGUAGE = "language";

  @SerializedName(SERIALIZED_NAME_LANGUAGE)
  private String language;

  public SearchDictionaryEntries query(String query) {
    this.query = query;
    return this;
  }

  /**
   * The text to search in the index.
   *
   * @return query
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "The text to search in the index.")
  public String getQuery() {
    return query;
  }

  public void setQuery(String query) {
    this.query = query;
  }

  public SearchDictionaryEntries page(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Specify the page to retrieve.
   *
   * @return page
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Specify the page to retrieve.")
  public Integer getPage() {
    return page;
  }

  public void setPage(Integer page) {
    this.page = page;
  }

  public SearchDictionaryEntries hitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Set the number of hits per page.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Set the number of hits per page.")
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public void setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
  }

  public SearchDictionaryEntries language(String language) {
    this.language = language;
    return this;
  }

  /**
   * Language ISO code supported by the dictionary (e.g., \"en\" for English).
   *
   * @return language
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Language ISO code supported by the dictionary (e.g., \"en\" for English)."
  )
  public String getLanguage() {
    return language;
  }

  public void setLanguage(String language) {
    this.language = language;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchDictionaryEntries searchDictionaryEntries = (SearchDictionaryEntries) o;
    return (
      Objects.equals(this.query, searchDictionaryEntries.query) &&
      Objects.equals(this.page, searchDictionaryEntries.page) &&
      Objects.equals(this.hitsPerPage, searchDictionaryEntries.hitsPerPage) &&
      Objects.equals(this.language, searchDictionaryEntries.language)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(query, page, hitsPerPage, language);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchDictionaryEntries {\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
    sb.append("    page: ").append(toIndentedString(page)).append("\n");
    sb
      .append("    hitsPerPage: ")
      .append(toIndentedString(hitsPerPage))
      .append("\n");
    sb.append("    language: ").append(toIndentedString(language)).append("\n");
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
