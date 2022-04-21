package com.algolia.model.predict;

import com.google.gson.annotations.SerializedName;
import java.math.BigDecimal;
import java.util.Objects;

/** Prediction for the **order_value** model. */
public class PredictionsOrderValue {

  @SerializedName("value")
  private BigDecimal value;

  @SerializedName("lastUpdatedAt")
  private String lastUpdatedAt;

  public PredictionsOrderValue setValue(BigDecimal value) {
    this.value = value;
    return this;
  }

  /**
   * Get value minimum: 0
   *
   * @return value
   */
  @javax.annotation.Nullable
  public BigDecimal getValue() {
    return value;
  }

  public PredictionsOrderValue setLastUpdatedAt(String lastUpdatedAt) {
    this.lastUpdatedAt = lastUpdatedAt;
    return this;
  }

  /**
   * Get lastUpdatedAt
   *
   * @return lastUpdatedAt
   */
  @javax.annotation.Nullable
  public String getLastUpdatedAt() {
    return lastUpdatedAt;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    PredictionsOrderValue predictionsOrderValue = (PredictionsOrderValue) o;
    return (
      Objects.equals(this.value, predictionsOrderValue.value) &&
      Objects.equals(this.lastUpdatedAt, predictionsOrderValue.lastUpdatedAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(value, lastUpdatedAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class PredictionsOrderValue {\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
    sb
      .append("    lastUpdatedAt: ")
      .append(toIndentedString(lastUpdatedAt))
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
