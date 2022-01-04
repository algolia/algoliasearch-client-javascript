package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** ListIndicesResponse */
public class ListIndicesResponse {

  @SerializedName("items")
  private List<Index> items = null;

  @SerializedName("nbPages")
  private Integer nbPages;

  public ListIndicesResponse items(List<Index> items) {
    this.items = items;
    return this;
  }

  public ListIndicesResponse addItemsItem(Index itemsItem) {
    if (this.items == null) {
      this.items = new ArrayList<>();
    }
    this.items.add(itemsItem);
    return this;
  }

  /**
   * List of the fetched indices.
   *
   * @return items
   */
  @javax.annotation.Nullable
  public List<Index> getItems() {
    return items;
  }

  public void setItems(List<Index> items) {
    this.items = items;
  }

  public ListIndicesResponse nbPages(Integer nbPages) {
    this.nbPages = nbPages;
    return this;
  }

  /**
   * Number of pages.
   *
   * @return nbPages
   */
  @javax.annotation.Nullable
  public Integer getNbPages() {
    return nbPages;
  }

  public void setNbPages(Integer nbPages) {
    this.nbPages = nbPages;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ListIndicesResponse listIndicesResponse = (ListIndicesResponse) o;
    return (
      Objects.equals(this.items, listIndicesResponse.items) &&
      Objects.equals(this.nbPages, listIndicesResponse.nbPages)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(items, nbPages);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ListIndicesResponse {\n");
    sb.append("    items: ").append(toIndentedString(items)).append("\n");
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
