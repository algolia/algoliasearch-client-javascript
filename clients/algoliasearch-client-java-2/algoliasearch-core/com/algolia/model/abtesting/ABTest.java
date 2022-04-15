package com.algolia.model.abtesting;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** ABTest */
public class ABTest {

  @SerializedName("abTestID")
  private Integer abTestID;

  @SerializedName("clickSignificance")
  private Double clickSignificance;

  @SerializedName("conversionSignificance")
  private Double conversionSignificance;

  @SerializedName("endAt")
  private String endAt;

  @SerializedName("createdAt")
  private String createdAt;

  @SerializedName("name")
  private String name;

  @SerializedName("status")
  private String status;

  @SerializedName("variants")
  private List<Variant> variants = new ArrayList<>();

  public ABTest setAbTestID(Integer abTestID) {
    this.abTestID = abTestID;
    return this;
  }

  /**
   * The A/B test ID.
   *
   * @return abTestID
   */
  @javax.annotation.Nonnull
  public Integer getAbTestID() {
    return abTestID;
  }

  public ABTest setClickSignificance(Double clickSignificance) {
    this.clickSignificance = clickSignificance;
    return this;
  }

  /**
   * A/B test significance based on click data. Should be > 0.95 to be considered significant (no
   * matter which variant is winning).
   *
   * @return clickSignificance
   */
  @javax.annotation.Nonnull
  public Double getClickSignificance() {
    return clickSignificance;
  }

  public ABTest setConversionSignificance(Double conversionSignificance) {
    this.conversionSignificance = conversionSignificance;
    return this;
  }

  /**
   * A/B test significance based on conversion data. Should be > 0.95 to be considered significant
   * (no matter which variant is winning).
   *
   * @return conversionSignificance
   */
  @javax.annotation.Nonnull
  public Double getConversionSignificance() {
    return conversionSignificance;
  }

  public ABTest setEndAt(String endAt) {
    this.endAt = endAt;
    return this;
  }

  /**
   * End date for the A/B test expressed as YYYY-MM-DDThh:mm:ssZ.
   *
   * @return endAt
   */
  @javax.annotation.Nonnull
  public String getEndAt() {
    return endAt;
  }

  public ABTest setCreatedAt(String createdAt) {
    this.createdAt = createdAt;
    return this;
  }

  /**
   * End date for the A/B test expressed as YYYY-MM-DDThh:mm:ssZ.
   *
   * @return createdAt
   */
  @javax.annotation.Nonnull
  public String getCreatedAt() {
    return createdAt;
  }

  public ABTest setName(String name) {
    this.name = name;
    return this;
  }

  /**
   * A/B test name.
   *
   * @return name
   */
  @javax.annotation.Nonnull
  public String getName() {
    return name;
  }

  public ABTest setStatus(String status) {
    this.status = status;
    return this;
  }

  /**
   * status of the A/B test.
   *
   * @return status
   */
  @javax.annotation.Nonnull
  public String getStatus() {
    return status;
  }

  public ABTest setVariants(List<Variant> variants) {
    this.variants = variants;
    return this;
  }

  public ABTest addVariantsItem(Variant variantsItem) {
    this.variants.add(variantsItem);
    return this;
  }

  /**
   * List of A/B test variant.
   *
   * @return variants
   */
  @javax.annotation.Nonnull
  public List<Variant> getVariants() {
    return variants;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ABTest abTest = (ABTest) o;
    return (
      Objects.equals(this.abTestID, abTest.abTestID) &&
      Objects.equals(this.clickSignificance, abTest.clickSignificance) &&
      Objects.equals(
        this.conversionSignificance,
        abTest.conversionSignificance
      ) &&
      Objects.equals(this.endAt, abTest.endAt) &&
      Objects.equals(this.createdAt, abTest.createdAt) &&
      Objects.equals(this.name, abTest.name) &&
      Objects.equals(this.status, abTest.status) &&
      Objects.equals(this.variants, abTest.variants)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      abTestID,
      clickSignificance,
      conversionSignificance,
      endAt,
      createdAt,
      name,
      status,
      variants
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ABTest {\n");
    sb.append("    abTestID: ").append(toIndentedString(abTestID)).append("\n");
    sb
      .append("    clickSignificance: ")
      .append(toIndentedString(clickSignificance))
      .append("\n");
    sb
      .append("    conversionSignificance: ")
      .append(toIndentedString(conversionSignificance))
      .append("\n");
    sb.append("    endAt: ").append(toIndentedString(endAt)).append("\n");
    sb
      .append("    createdAt: ")
      .append(toIndentedString(createdAt))
      .append("\n");
    sb.append("    name: ").append(toIndentedString(name)).append("\n");
    sb.append("    status: ").append(toIndentedString(status)).append("\n");
    sb.append("    variants: ").append(toIndentedString(variants)).append("\n");
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
