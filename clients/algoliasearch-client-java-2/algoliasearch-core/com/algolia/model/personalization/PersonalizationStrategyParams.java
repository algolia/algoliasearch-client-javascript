package com.algolia.model.personalization;

import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** PersonalizationStrategyParams */
public class PersonalizationStrategyParams {

  @SerializedName("eventScoring")
  private List<EventScoring> eventScoring = new ArrayList<>();

  @SerializedName("facetScoring")
  private List<FacetScoring> facetScoring = new ArrayList<>();

  @SerializedName("personalizationImpact")
  private Integer personalizationImpact;

  public PersonalizationStrategyParams setEventScoring(
    List<EventScoring> eventScoring
  ) {
    this.eventScoring = eventScoring;
    return this;
  }

  public PersonalizationStrategyParams addEventScoringItem(
    EventScoring eventScoringItem
  ) {
    this.eventScoring.add(eventScoringItem);
    return this;
  }

  /**
   * Scores associated with the events.
   *
   * @return eventScoring
   */
  @javax.annotation.Nonnull
  public List<EventScoring> getEventScoring() {
    return eventScoring;
  }

  public PersonalizationStrategyParams setFacetScoring(
    List<FacetScoring> facetScoring
  ) {
    this.facetScoring = facetScoring;
    return this;
  }

  public PersonalizationStrategyParams addFacetScoringItem(
    FacetScoring facetScoringItem
  ) {
    this.facetScoring.add(facetScoringItem);
    return this;
  }

  /**
   * Scores associated with the facets.
   *
   * @return facetScoring
   */
  @javax.annotation.Nonnull
  public List<FacetScoring> getFacetScoring() {
    return facetScoring;
  }

  public PersonalizationStrategyParams setPersonalizationImpact(
    Integer personalizationImpact
  ) {
    this.personalizationImpact = personalizationImpact;
    return this;
  }

  /**
   * The impact that personalization has on search results: a number between 0 (personalization
   * disabled) and 100 (personalization fully enabled).
   *
   * @return personalizationImpact
   */
  @javax.annotation.Nonnull
  public Integer getPersonalizationImpact() {
    return personalizationImpact;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    PersonalizationStrategyParams personalizationStrategyParams = (PersonalizationStrategyParams) o;
    return (
      Objects.equals(
        this.eventScoring,
        personalizationStrategyParams.eventScoring
      ) &&
      Objects.equals(
        this.facetScoring,
        personalizationStrategyParams.facetScoring
      ) &&
      Objects.equals(
        this.personalizationImpact,
        personalizationStrategyParams.personalizationImpact
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(eventScoring, facetScoring, personalizationImpact);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class PersonalizationStrategyParams {\n");
    sb
      .append("    eventScoring: ")
      .append(toIndentedString(eventScoring))
      .append("\n");
    sb
      .append("    facetScoring: ")
      .append(toIndentedString(facetScoring))
      .append("\n");
    sb
      .append("    personalizationImpact: ")
      .append(toIndentedString(personalizationImpact))
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
