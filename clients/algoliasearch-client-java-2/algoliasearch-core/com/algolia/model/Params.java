package com.algolia.model;

import com.google.gson.annotations.SerializedName;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/** Additional search parameters. Any valid search parameter is allowed. */
@ApiModel(
  description = "Additional search parameters. Any valid search parameter is allowed."
)
public class Params {

  public static final String SERIALIZED_NAME_QUERY = "query";

  @SerializedName(SERIALIZED_NAME_QUERY)
  private String query;

  public static final String SERIALIZED_NAME_AUTOMATIC_FACET_FILTERS =
    "automaticFacetFilters";

  @SerializedName(SERIALIZED_NAME_AUTOMATIC_FACET_FILTERS)
  private List<AutomaticFacetFilter> automaticFacetFilters = null;

  public static final String SERIALIZED_NAME_AUTOMATIC_OPTIONAL_FACET_FILTERS =
    "automaticOptionalFacetFilters";

  @SerializedName(SERIALIZED_NAME_AUTOMATIC_OPTIONAL_FACET_FILTERS)
  private List<AutomaticFacetFilter> automaticOptionalFacetFilters = null;

  public Params query(String query) {
    this.query = query;
    return this;
  }

  /**
   * Query string.
   *
   * @return query
   */
  @javax.annotation.Nullable
  @ApiModelProperty(value = "Query string.")
  public String getQuery() {
    return query;
  }

  public void setQuery(String query) {
    this.query = query;
  }

  public Params automaticFacetFilters(
    List<AutomaticFacetFilter> automaticFacetFilters
  ) {
    this.automaticFacetFilters = automaticFacetFilters;
    return this;
  }

  public Params addAutomaticFacetFiltersItem(
    AutomaticFacetFilter automaticFacetFiltersItem
  ) {
    if (this.automaticFacetFilters == null) {
      this.automaticFacetFilters = new ArrayList<>();
    }
    this.automaticFacetFilters.add(automaticFacetFiltersItem);
    return this;
  }

  /**
   * Names of facets to which automatic filtering must be applied; they must match the facet name of
   * a facet value placeholder in the query pattern.
   *
   * @return automaticFacetFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Names of facets to which automatic filtering must be applied; they must match the facet" +
    " name of a facet value placeholder in the query pattern."
  )
  public List<AutomaticFacetFilter> getAutomaticFacetFilters() {
    return automaticFacetFilters;
  }

  public void setAutomaticFacetFilters(
    List<AutomaticFacetFilter> automaticFacetFilters
  ) {
    this.automaticFacetFilters = automaticFacetFilters;
  }

  public Params automaticOptionalFacetFilters(
    List<AutomaticFacetFilter> automaticOptionalFacetFilters
  ) {
    this.automaticOptionalFacetFilters = automaticOptionalFacetFilters;
    return this;
  }

  public Params addAutomaticOptionalFacetFiltersItem(
    AutomaticFacetFilter automaticOptionalFacetFiltersItem
  ) {
    if (this.automaticOptionalFacetFilters == null) {
      this.automaticOptionalFacetFilters = new ArrayList<>();
    }
    this.automaticOptionalFacetFilters.add(automaticOptionalFacetFiltersItem);
    return this;
  }

  /**
   * Same syntax as automaticFacetFilters, but the engine treats the filters as optional.
   *
   * @return automaticOptionalFacetFilters
   */
  @javax.annotation.Nullable
  @ApiModelProperty(
    value = "Same syntax as automaticFacetFilters, but the engine treats the filters as optional."
  )
  public List<AutomaticFacetFilter> getAutomaticOptionalFacetFilters() {
    return automaticOptionalFacetFilters;
  }

  public void setAutomaticOptionalFacetFilters(
    List<AutomaticFacetFilter> automaticOptionalFacetFilters
  ) {
    this.automaticOptionalFacetFilters = automaticOptionalFacetFilters;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    Params params = (Params) o;
    return (
      Objects.equals(this.query, params.query) &&
      Objects.equals(
        this.automaticFacetFilters,
        params.automaticFacetFilters
      ) &&
      Objects.equals(
        this.automaticOptionalFacetFilters,
        params.automaticOptionalFacetFilters
      )
    );
  }

  @Override
  public int hashCode() {
    return Objects.hash(
      query,
      automaticFacetFilters,
      automaticOptionalFacetFilters
    );
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class Params {\n");
    sb.append("    query: ").append(toIndentedString(query)).append("\n");
    sb
      .append("    automaticFacetFilters: ")
      .append(toIndentedString(automaticFacetFilters))
      .append("\n");
    sb
      .append("    automaticOptionalFacetFilters: ")
      .append(toIndentedString(automaticOptionalFacetFilters))
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
