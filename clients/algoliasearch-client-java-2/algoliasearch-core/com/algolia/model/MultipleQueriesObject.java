package com.algolia.model;

import com.google.gson.TypeAdapter;
import com.google.gson.annotations.JsonAdapter;
import com.google.gson.annotations.SerializedName;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonWriter;
import io.swagger.annotations.ApiModelProperty;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** MultipleQueriesObject */
public class MultipleQueriesObject {

  public static final String SERIALIZED_NAME_REQUESTS = "requests";

  @SerializedName(SERIALIZED_NAME_REQUESTS)
  private List<MultipleQueries> requests = new ArrayList<>();

  /** Gets or Sets strategy */
  @JsonAdapter(StrategyEnum.Adapter.class)
  public enum StrategyEnum {
    NONE("none"),

    STOPIFENOUGHMATCHES("stopIfEnoughMatches");

    private String value;

    StrategyEnum(String value) {
      this.value = value;
    }

    public String getValue() {
      return value;
    }

    @Override
    public String toString() {
      return String.valueOf(value);
    }

    public static StrategyEnum fromValue(String value) {
      for (StrategyEnum b : StrategyEnum.values()) {
        if (b.value.equals(value)) {
          return b;
        }
      }
      throw new IllegalArgumentException("Unexpected value '" + value + "'");
    }

    public static class Adapter extends TypeAdapter<StrategyEnum> {

      @Override
      public void write(
        final JsonWriter jsonWriter,
        final StrategyEnum enumeration
      ) throws IOException {
        jsonWriter.value(enumeration.getValue());
      }

      @Override
      public StrategyEnum read(final JsonReader jsonReader) throws IOException {
        String value = jsonReader.nextString();
        return StrategyEnum.fromValue(value);
      }
    }
  }

  public static final String SERIALIZED_NAME_STRATEGY = "strategy";

  @SerializedName(SERIALIZED_NAME_STRATEGY)
  private StrategyEnum strategy;

  public MultipleQueriesObject requests(List<MultipleQueries> requests) {
    this.requests = requests;
    return this;
  }

  public MultipleQueriesObject addRequestsItem(MultipleQueries requestsItem) {
    this.requests.add(requestsItem);
    return this;
  }

  /**
   * Get requests
   *
   * @return requests
   */
  @javax.annotation.Nonnull
  @ApiModelProperty(required = true, value = "")
  public List<MultipleQueries> getRequests() {
    return requests;
  }

  public void setRequests(List<MultipleQueries> requests) {
    this.requests = requests;
  }

  public MultipleQueriesObject strategy(StrategyEnum strategy) {
    this.strategy = strategy;
    return this;
  }

  /**
   * Get strategy
   *
   * @return strategy
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "")
  public StrategyEnum getStrategy() {
    return strategy;
  }

  public void setStrategy(StrategyEnum strategy) {
    this.strategy = strategy;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    MultipleQueriesObject multipleQueriesObject = (MultipleQueriesObject) o;
    return (
      Objects.equals(this.requests, multipleQueriesObject.requests) &&
      Objects.equals(this.strategy, multipleQueriesObject.strategy)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(requests, strategy);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class MultipleQueriesObject {\n");
    sb.append("    requests: ").append(toIndentedString(requests)).append("\n");
    sb.append("    strategy: ").append(toIndentedString(strategy)).append("\n");
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
