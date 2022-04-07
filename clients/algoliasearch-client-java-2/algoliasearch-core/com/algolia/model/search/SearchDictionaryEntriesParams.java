package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** The `searchDictionaryEntries` parameters. */
public class SearchDictionaryEntriesParams {

  @SerializedName("query")
  private String query = "";

  @SerializedName("page")
  private Integer page = 0;

  @SerializedName("hitsPerPage")
  private Integer hitsPerPage = 20;

  @SerializedName("language")
  private String language;

  public SearchDictionaryEntriesParams setQuery(String query) {
    this.query = query;
    return this;
  }

  /**
   * The text to search in the index.
   *
   * @return query
   */
  @javax.annotation.Nonnull
  public String getQuery() {
    return query;
  }

  public SearchDictionaryEntriesParams setPage(Integer page) {
    this.page = page;
    return this;
  }

  /**
   * Specify the page to retrieve.
   *
   * @return page
   */
  @javax.annotation.Nullable
  public Integer getPage() {
    return page;
  }

  public SearchDictionaryEntriesParams setHitsPerPage(Integer hitsPerPage) {
    this.hitsPerPage = hitsPerPage;
    return this;
  }

  /**
   * Set the number of hits per page.
   *
   * @return hitsPerPage
   */
  @javax.annotation.Nullable
  public Integer getHitsPerPage() {
    return hitsPerPage;
  }

  public SearchDictionaryEntriesParams setLanguage(String language) {
    this.language = language;
    return this;
  }

  /**
   * Language ISO code supported by the dictionary (e.g., \"en\" for English).
   *
   * @return language
   */
  @javax.annotation.Nullable
  public String getLanguage() {
    return language;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    SearchDictionaryEntriesParams searchDictionaryEntriesParams = (SearchDictionaryEntriesParams) o;
    return (
      Objects.equals(this.query, searchDictionaryEntriesParams.query) &&
      Objects.equals(this.page, searchDictionaryEntriesParams.page) &&
      Objects.equals(
        this.hitsPerPage,
        searchDictionaryEntriesParams.hitsPerPage
      ) &&
      Objects.equals(this.language, searchDictionaryEntriesParams.language)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(query, page, hitsPerPage, language);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class SearchDictionaryEntriesParams {\n");
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
