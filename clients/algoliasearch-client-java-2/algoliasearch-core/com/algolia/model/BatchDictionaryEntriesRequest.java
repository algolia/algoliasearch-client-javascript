package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import java.io.IOException;
import java.util.Objects;

/** BatchDictionaryEntriesRequest */
public class BatchDictionaryEntriesRequest {

  /** Actions to perform. */
  @JsonAdapter(ActionEnum.Adapter.class)
  public enum ActionEnum {
    ADDENTRY("addEntry"),

    DELETEENTRY("deleteEntry");

    private String value;

    ActionEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static ActionEnum fromValue(String value) {
      for (ActionEnum b : ActionEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<ActionEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final ActionEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public ActionEnum read(final JsonReader jsonReader) throws IOException {
        String value = jsonReader.nextString();
        return ActionEnum.fromValue(value);
      }
    }
  }

  @SerializedName("action")
  private ActionEnum action;

  @SerializedName("body")
  private DictionaryEntry body;

  public BatchDictionaryEntriesRequest action(ActionEnum action) {
    this.action = action;
    return this;
  }

  /**
   * Actions to perform.
   *
   * @return action
   */
  @javax.annotation.Nonnull
  public ActionEnum getAction() {
    return action;
  }

  public void setAction(ActionEnum action) {
    this.action = action;
  }

  public BatchDictionaryEntriesRequest body(DictionaryEntry body) {
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

  public void setBody(DictionaryEntry body) {
    this.body = body;
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
