package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** BatchDictionaryEntriesRequest */
public class BatchDictionaryEntriesRequest {

  @SerializedName("action")
  private DictionaryAction action;

  @SerializedName("body")
  private DictionaryEntry body;

  public BatchDictionaryEntriesRequest setAction(DictionaryAction action) {
    this.action = action;
    return this;
  }

  /**
   * Get action
   *
   * @return action
   */
  @javax.annotation.Nonnull
  public DictionaryAction getAction() {
    return action;
  }

  public BatchDictionaryEntriesRequest setBody(DictionaryEntry body) {
    this.body = body;
    return this;
  }

  /**
   * Get body
   *
   * @return body
   */
  @javax.annotation.Nonnull
  public DictionaryEntry getBody() {
    return body;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    BatchDictionaryEntriesRequest batchDictionaryEntriesRequest = (BatchDictionaryEntriesRequest) o;
    return (
      Objects.equals(this.action, batchDictionaryEntriesRequest.action) &&
      Objects.equals(this.body, batchDictionaryEntriesRequest.body)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(action, body);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class BatchDictionaryEntriesRequest {\n");
    sb.append("    action: ").append(toIndentedString(action)).append("\n");
    sb.append("    body: ").append(toIndentedString(body)).append("\n");
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
