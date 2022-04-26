package com.algolia.model.search;

import com.google.gson.annotations.SerializedName;
import java.util.Objects;

/** RankingInfo */
public class RankingInfo {

  @SerializedName("filters")
  private Integer filters;

  @SerializedName("firstMatchedWord")
  private Integer firstMatchedWord;

  @SerializedName("geoDistance")
  private Integer geoDistance;

  @SerializedName("geoPrecision")
  private Integer geoPrecision;

  @SerializedName("matchedGeoLocation")
  private MatchedGeoLocation matchedGeoLocation;

  @SerializedName("personalization")
  private Personalization personalization;

  @SerializedName("nbExactWords")
  private Integer nbExactWords;

  @SerializedName("nbTypos")
  private Integer nbTypos;

  @SerializedName("promoted")
  private Boolean promoted;

  @SerializedName("proximityDistance")
  private Integer proximityDistance;

  @SerializedName("userScore")
  private Integer userScore;

  @SerializedName("words")
  private Integer words;

  @SerializedName("promotedByReRanking")
  private Boolean promotedByReRanking;

  public RankingInfo setFilters(Integer filters) {
    this.filters = filters;
    return this;
  }

  /**
   * This field is reserved for advanced usage.
   *
   * @return filters
   */
  @javax.annotation.Nonnull
  public Integer getFilters() {
    return filters;
  }

  public RankingInfo setFirstMatchedWord(Integer firstMatchedWord) {
    this.firstMatchedWord = firstMatchedWord;
    return this;
  }

  /**
   * Position of the most important matched attribute in the attributes to index list.
   *
   * @return firstMatchedWord
   */
  @javax.annotation.Nonnull
  public Integer getFirstMatchedWord() {
    return firstMatchedWord;
  }

  public RankingInfo setGeoDistance(Integer geoDistance) {
    this.geoDistance = geoDistance;
    return this;
  }

  /**
   * Distance between the geo location in the search query and the best matching geo location in the
   * record, divided by the geo precision (in meters).
   *
   * @return geoDistance
   */
  @javax.annotation.Nonnull
  public Integer getGeoDistance() {
    return geoDistance;
  }

  public RankingInfo setGeoPrecision(Integer geoPrecision) {
    this.geoPrecision = geoPrecision;
    return this;
  }

  /**
   * Precision used when computing the geo distance, in meters.
   *
   * @return geoPrecision
   */
  @javax.annotation.Nullable
  public Integer getGeoPrecision() {
    return geoPrecision;
  }

  public RankingInfo setMatchedGeoLocation(
    MatchedGeoLocation matchedGeoLocation
  ) {
    this.matchedGeoLocation = matchedGeoLocation;
    return this;
  }

  /**
   * Get matchedGeoLocation
   *
   * @return matchedGeoLocation
   */
  @javax.annotation.Nullable
  public MatchedGeoLocation getMatchedGeoLocation() {
    return matchedGeoLocation;
  }

  public RankingInfo setPersonalization(Personalization personalization) {
    this.personalization = personalization;
    return this;
  }

  /**
   * Get personalization
   *
   * @return personalization
   */
  @javax.annotation.Nullable
  public Personalization getPersonalization() {
    return personalization;
  }

  public RankingInfo setNbExactWords(Integer nbExactWords) {
    this.nbExactWords = nbExactWords;
    return this;
  }

  /**
   * Number of exactly matched words.
   *
   * @return nbExactWords
   */
  @javax.annotation.Nonnull
  public Integer getNbExactWords() {
    return nbExactWords;
  }

  public RankingInfo setNbTypos(Integer nbTypos) {
    this.nbTypos = nbTypos;
    return this;
  }

  /**
   * Number of typos encountered when matching the record.
   *
   * @return nbTypos
   */
  @javax.annotation.Nonnull
  public Integer getNbTypos() {
    return nbTypos;
  }

  public RankingInfo setPromoted(Boolean promoted) {
    this.promoted = promoted;
    return this;
  }

  /**
   * Present and set to true if a Rule promoted the hit.
   *
   * @return promoted
   */
  @javax.annotation.Nonnull
  public Boolean getPromoted() {
    return promoted;
  }

  public RankingInfo setProximityDistance(Integer proximityDistance) {
    this.proximityDistance = proximityDistance;
    return this;
  }

  /**
   * When the query contains more than one word, the sum of the distances between matched words (in
   * meters).
   *
   * @return proximityDistance
   */
  @javax.annotation.Nullable
  public Integer getProximityDistance() {
    return proximityDistance;
  }

  public RankingInfo setUserScore(Integer userScore) {
    this.userScore = userScore;
    return this;
  }

  /**
   * Custom ranking for the object, expressed as a single integer value.
   *
   * @return userScore
   */
  @javax.annotation.Nonnull
  public Integer getUserScore() {
    return userScore;
  }

  public RankingInfo setWords(Integer words) {
    this.words = words;
    return this;
  }

  /**
   * Number of matched words, including prefixes and typos.
   *
   * @return words
   */
  @javax.annotation.Nonnull
  public Integer getWords() {
    return words;
  }

  public RankingInfo setPromotedByReRanking(Boolean promotedByReRanking) {
    this.promotedByReRanking = promotedByReRanking;
    return this;
  }

  /**
   * Wether the record are promoted by the re-ranking strategy.
   *
   * @return promotedByReRanking
   */
  @javax.annotation.Nullable
  public Boolean getPromotedByReRanking() {
    return promotedByReRanking;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RankingInfo rankingInfo = (RankingInfo) o;
    return (
      Objects.equals(this.filters, rankingInfo.filters) &&
      Objects.equals(this.firstMatchedWord, rankingInfo.firstMatchedWord) &&
      Objects.equals(this.geoDistance, rankingInfo.geoDistance) &&
      Objects.equals(this.geoPrecision, rankingInfo.geoPrecision) &&
      Objects.equals(this.matchedGeoLocation, rankingInfo.matchedGeoLocation) &&
      Objects.equals(this.personalization, rankingInfo.personalization) &&
      Objects.equals(this.nbExactWords, rankingInfo.nbExactWords) &&
      Objects.equals(this.nbTypos, rankingInfo.nbTypos) &&
      Objects.equals(this.promoted, rankingInfo.promoted) &&
      Objects.equals(this.proximityDistance, rankingInfo.proximityDistance) &&
      Objects.equals(this.userScore, rankingInfo.userScore) &&
      Objects.equals(this.words, rankingInfo.words) &&
      Objects.equals(this.promotedByReRanking, rankingInfo.promotedByReRanking)
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      filters,
      firstMatchedWord,
      geoDistance,
      geoPrecision,
      matchedGeoLocation,
      personalization,
      nbExactWords,
      nbTypos,
      promoted,
      proximityDistance,
      userScore,
      words,
      promotedByReRanking
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RankingInfo {\n");
    sb.append("    filters: ").append(toIndentedString(filters)).append("\n");
    sb
      .append("    firstMatchedWord: ")
      .append(toIndentedString(firstMatchedWord))
      .append("\n");
    sb
      .append("    geoDistance: ")
      .append(toIndentedString(geoDistance))
      .append("\n");
    sb
      .append("    geoPrecision: ")
      .append(toIndentedString(geoPrecision))
      .append("\n");
    sb
      .append("    matchedGeoLocation: ")
      .append(toIndentedString(matchedGeoLocation))
      .append("\n");
    sb
      .append("    personalization: ")
      .append(toIndentedString(personalization))
      .append("\n");
    sb
      .append("    nbExactWords: ")
      .append(toIndentedString(nbExactWords))
      .append("\n");
    sb.append("    nbTypos: ").append(toIndentedString(nbTypos)).append("\n");
    sb.append("    promoted: ").append(toIndentedString(promoted)).append("\n");
    sb
      .append("    proximityDistance: ")
      .append(toIndentedString(proximityDistance))
      .append("\n");
    sb
      .append("    userScore: ")
      .append(toIndentedString(userScore))
      .append("\n");
    sb.append("    words: ").append(toIndentedString(words)).append("\n");
    sb
      .append("    promotedByReRanking: ")
      .append(toIndentedString(promotedByReRanking))
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
