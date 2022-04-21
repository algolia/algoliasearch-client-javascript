package com.algolia.model.predict;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Prediction for the **affinities** model. */
public class PredictionsAffinities {

  @SerializedName("value")
  private List<Affinities> value = null;

  @SerializedName("lastUpdatedAt")
  private String lastUpdatedAt;

  public PredictionsAffinities setValue(List<Affinities> value) {
    this.value = value;
    return this;
  }

  public PredictionsAffinities addValueItem(Affinities valueItem) {
    if (this.value == null) {
      this.value = new ArrayList<>();
    }
    this.value.add(valueItem);
    return this;
  }

  /**
   * Get value
   *
   * @return value
   */
  @javax.annotation.Nullable
  public List<Affinities> getValue() {
    return value;
  }

  public PredictionsAffinities setLastUpdatedAt(String lastUpdatedAt) {
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
    PredictionsAffinities predictionsAffinities = (PredictionsAffinities) o;
    return (
      Objects.equals(this.value, predictionsAffinities.value) &&
      Objects.equals(this.lastUpdatedAt, predictionsAffinities.lastUpdatedAt)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(value, lastUpdatedAt);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class PredictionsAffinities {\n");
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
