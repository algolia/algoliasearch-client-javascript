package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** ListApiKeysResponse */
public class ListApiKeysResponse {

  public static final String SERIALIZED_NAME_KEYS = "keys";

  @SerializedName(SERIALIZED_NAME_KEYS)
  private List<KeyObject> keys = new ArrayList<>();

  public ListApiKeysResponse keys(List<KeyObject> keys) {
    this.keys = keys;
    return this;
  }

  public ListApiKeysResponse addKeysItem(KeyObject keysItem) {
    this.keys.add(keysItem);
    return this;
  }

  /**
   * List of api keys.
   *
   * @return keys
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "List of api keys.")
  public List<KeyObject> getKeys() {
    return keys;
  }

  public void setKeys(List<KeyObject> keys) {
    this.keys = keys;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ListApiKeysResponse listApiKeysResponse = (ListApiKeysResponse) o;
    return Objects.equals(this.keys, listApiKeysResponse.keys);
  }

  @Override
  public int hashCode() {
    return Objects.hash(keys);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ListApiKeysResponse {\n");
    sb.append("    keys: ").append(toIndentedString(keys)).append("\n");
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
