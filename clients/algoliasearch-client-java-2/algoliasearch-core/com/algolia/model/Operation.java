package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

/** Operation */
public class Operation {

  /** type of operation. */
  @JsonAdapter(ActionEnum.Adapter.class)
  public enum ActionEnum {
    ADDOBJECT("addObject"),

    UPDATEOBJECT("updateObject"),

    PARTIALUPDATEOBJECT("partialUpdateObject"),

    PARTIALUPDATEOBJECTNOCREATE("partialUpdateObjectNoCreate"),

    DELETEOBJECT("deleteObject"),

    DELETE("delete"),

    CLEAR("clear");

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

  public static final String SERIALIZED_NAME_ACTION = "action";

  @SerializedName(SERIALIZED_NAME_ACTION)
  private ActionEnum action;

  public static final String SERIALIZED_NAME_BODY = "body";

  @SerializedName(SERIALIZED_NAME_BODY)
  private Map<String, Object> body = null;

  public Operation action(ActionEnum action) {
    this.action = action;
    return this;
  }

  /**
   * type of operation.
   *
   * @return action
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "type of operation.")
  public ActionEnum getAction() {
    return action;
  }

  public void setAction(ActionEnum action) {
    this.action = action;
  }

  public Operation body(Map<String, Object> body) {
    this.body = body;
    return this;
  }

  public Operation putBodyItem(String key, Object bodyItem) {
    if (this.body == null) {
      this.body = new HashMap<>();
    }
    this.body.put(key, bodyItem);
    return this;
  }

  /**
   * arguments to the operation (depends on the type of the operation).
   *
   * @return body
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "arguments to the operation (depends on the type of the operation)."
  )
  public Map<String, Object> getBody() {
    return body;
  }

  public void setBody(Map<String, Object> body) {
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
    Operation operation = (Operation) o;
    return (
      Objects.equals(this.action, operation.action) &&
      Objects.equals(this.body, operation.body)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(action, body);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Operation {\n");
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
