package com.algolia.model.predict;

import com.google.gson.annotations.SerializedName;
import java.math.BigDecimal;
import java.util.Objects;

/** Affinities */
public class Affinities {

  @SerializedName("name")
  private String name;

  @SerializedName("value")
  private String value;

  @SerializedName("probability")
  private BigDecimal probability;

  public Affinities setName(String name) {
    this.name = name;
    return this;
  }

  /**
   * Get name
   *
   * @return name
   */
  @javax.annotation.Nullable
  public String getName() {
    return name;
  }

  public Affinities setValue(String value) {
    this.value = value;
    return this;
  }

  /**
   * Get value
   *
   * @return value
   */
  @javax.annotation.Nullable
  public String getValue() {
    return value;
  }

  public Affinities setProbability(BigDecimal probability) {
    this.probability = probability;
    return this;
  }

  /**
   * Get probability minimum: 0 maximum: 1
   *
   * @return probability
   */
  @javax.annotation.Nullable
  public BigDecimal getProbability() {
    return probability;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Affinities affinities = (Affinities) o;
    return (
      Objects.equals(this.name, affinities.name) &&
      Objects.equals(this.value, affinities.value) &&
      Objects.equals(this.probability, affinities.probability)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(name, value, probability);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Affinities {\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    value: ").append(toIndentedString(value)).append("\n");
    sb
      .append("    probability: ")
      .append(toIndentedString(probability))
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
