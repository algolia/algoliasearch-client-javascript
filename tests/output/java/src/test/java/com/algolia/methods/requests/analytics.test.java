package com.algolia.methods.requests;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.algolia.JSON;
import com.algolia.Pair;
import com.algolia.api.AnalyticsClient;
import com.algolia.model.analytics.*;
import com.algolia.utils.echo.*;
import com.google.gson.reflect.TypeToken;
import java.util.*;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.skyscreamer.jsonassert.JSONAssert;
import org.skyscreamer.jsonassert.JSONCompareMode;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class AnalyticsClientTests {

  private AnalyticsClient client;

  @BeforeAll
  void init() {
    client = new AnalyticsClient("appId", "apiKey", new EchoRequester());
  }

  @Test
  @DisplayName("allow del method for a custom path with minimal parameters")
  void delTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.del(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("allow del method for a custom path with all parameters")
  void delTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.del(path0, parameters0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "DELETE");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("allow get method for a custom path with minimal parameters")
  void getTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.get(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("allow get method for a custom path with all parameters")
  void getTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.get(path0, parameters0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getAverageClickPosition with minimal parameters")
  void getAverageClickPositionTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getAverageClickPosition(index0);
      }
    );

    assertEquals(req.getPath(), "/2/clicks/averageClickPosition");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getAverageClickPosition with all parameters")
  void getAverageClickPositionTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getAverageClickPosition(
          index0,
          startDate0,
          endDate0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/clicks/averageClickPosition");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getClickPositions with minimal parameters")
  void getClickPositionsTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getClickPositions(index0);
      }
    );

    assertEquals(req.getPath(), "/2/clicks/positions");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getClickPositions with all parameters")
  void getClickPositionsTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getClickPositions(index0, startDate0, endDate0, tags0);
      }
    );

    assertEquals(req.getPath(), "/2/clicks/positions");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getClickThroughRate with minimal parameters")
  void getClickThroughRateTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getClickThroughRate(index0);
      }
    );

    assertEquals(req.getPath(), "/2/clicks/clickThroughRate");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getClickThroughRate with all parameters")
  void getClickThroughRateTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getClickThroughRate(index0, startDate0, endDate0, tags0);
      }
    );

    assertEquals(req.getPath(), "/2/clicks/clickThroughRate");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getConversationRate with minimal parameters")
  void getConversationRateTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getConversationRate(index0);
      }
    );

    assertEquals(req.getPath(), "/2/conversions/conversionRate");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getConversationRate with all parameters")
  void getConversationRateTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getConversationRate(index0, startDate0, endDate0, tags0);
      }
    );

    assertEquals(req.getPath(), "/2/conversions/conversionRate");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getNoClickRate with minimal parameters")
  void getNoClickRateTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getNoClickRate(index0);
      }
    );

    assertEquals(req.getPath(), "/2/searches/noClickRate");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getNoClickRate with all parameters")
  void getNoClickRateTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getNoClickRate(index0, startDate0, endDate0, tags0);
      }
    );

    assertEquals(req.getPath(), "/2/searches/noClickRate");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getNoResultsRate with minimal parameters")
  void getNoResultsRateTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getNoResultsRate(index0);
      }
    );

    assertEquals(req.getPath(), "/2/searches/noResultRate");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getNoResultsRate with all parameters")
  void getNoResultsRateTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getNoResultsRate(index0, startDate0, endDate0, tags0);
      }
    );

    assertEquals(req.getPath(), "/2/searches/noResultRate");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getSearchesCount with minimal parameters")
  void getSearchesCountTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSearchesCount(index0);
      }
    );

    assertEquals(req.getPath(), "/2/searches/count");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getSearchesCount with all parameters")
  void getSearchesCountTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSearchesCount(index0, startDate0, endDate0, tags0);
      }
    );

    assertEquals(req.getPath(), "/2/searches/count");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getSearchesNoClicks with minimal parameters")
  void getSearchesNoClicksTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSearchesNoClicks(index0);
      }
    );

    assertEquals(req.getPath(), "/2/searches/noClicks");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getSearchesNoClicks with all parameters")
  void getSearchesNoClicksTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    int limit0 = 21;

    int offset0 = 42;

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSearchesNoClicks(
          index0,
          startDate0,
          endDate0,
          limit0,
          offset0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/searches/noClicks");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"limit\":\"21\",\"offset\":\"42\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getSearchesNoResults with minimal parameters")
  void getSearchesNoResultsTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSearchesNoResults(index0);
      }
    );

    assertEquals(req.getPath(), "/2/searches/noResults");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getSearchesNoResults with all parameters")
  void getSearchesNoResultsTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    int limit0 = 21;

    int offset0 = 42;

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSearchesNoResults(
          index0,
          startDate0,
          endDate0,
          limit0,
          offset0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/searches/noResults");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"limit\":\"21\",\"offset\":\"42\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getStatus with minimal parameters")
  void getStatusTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getStatus(index0);
      }
    );

    assertEquals(req.getPath(), "/2/status");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopCountries with minimal parameters")
  void getTopCountriesTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopCountries(index0);
      }
    );

    assertEquals(req.getPath(), "/2/countries");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopCountries with all parameters")
  void getTopCountriesTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    int limit0 = 21;

    int offset0 = 42;

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopCountries(
          index0,
          startDate0,
          endDate0,
          limit0,
          offset0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/countries");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"limit\":\"21\",\"offset\":\"42\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopFilterAttributes with minimal parameters")
  void getTopFilterAttributesTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopFilterAttributes(index0);
      }
    );

    assertEquals(req.getPath(), "/2/filters");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopFilterAttributes with all parameters")
  void getTopFilterAttributesTest1() {
    String index0 = "index";

    String search0 = "mySearch";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    int limit0 = 21;

    int offset0 = 42;

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopFilterAttributes(
          index0,
          search0,
          startDate0,
          endDate0,
          limit0,
          offset0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/filters");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"search\":\"mySearch\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"limit\":\"21\",\"offset\":\"42\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopFilterForAttribute with minimal parameters")
  void getTopFilterForAttributeTest0() {
    String attribute0 = "myAttribute";

    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopFilterForAttribute(attribute0, index0);
      }
    );

    assertEquals(req.getPath(), "/2/filters/myAttribute");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName(
    "get getTopFilterForAttribute with minimal parameters and multiple attributes"
  )
  void getTopFilterForAttributeTest1() {
    String attribute0 = "myAttribute1,myAttribute2";

    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopFilterForAttribute(attribute0, index0);
      }
    );

    assertEquals(req.getPath(), "/2/filters/myAttribute1%2CmyAttribute2");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopFilterForAttribute with all parameters")
  void getTopFilterForAttributeTest2() {
    String attribute0 = "myAttribute";

    String index0 = "index";

    String search0 = "mySearch";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    int limit0 = 21;

    int offset0 = 42;

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopFilterForAttribute(
          attribute0,
          index0,
          search0,
          startDate0,
          endDate0,
          limit0,
          offset0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/filters/myAttribute");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"search\":\"mySearch\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"limit\":\"21\",\"offset\":\"42\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName(
    "get getTopFilterForAttribute with all parameters and multiple attributes"
  )
  void getTopFilterForAttributeTest3() {
    String attribute0 = "myAttribute1,myAttribute2";

    String index0 = "index";

    String search0 = "mySearch";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    int limit0 = 21;

    int offset0 = 42;

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopFilterForAttribute(
          attribute0,
          index0,
          search0,
          startDate0,
          endDate0,
          limit0,
          offset0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/filters/myAttribute1%2CmyAttribute2");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"search\":\"mySearch\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"limit\":\"21\",\"offset\":\"42\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopFiltersNoResults with minimal parameters")
  void getTopFiltersNoResultsTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopFiltersNoResults(index0);
      }
    );

    assertEquals(req.getPath(), "/2/filters/noResults");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopFiltersNoResults with all parameters")
  void getTopFiltersNoResultsTest1() {
    String index0 = "index";

    String search0 = "mySearch";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    int limit0 = 21;

    int offset0 = 42;

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopFiltersNoResults(
          index0,
          search0,
          startDate0,
          endDate0,
          limit0,
          offset0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/filters/noResults");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"search\":\"mySearch\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"limit\":\"21\",\"offset\":\"42\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopHits with minimal parameters")
  void getTopHitsTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopHits(index0);
      }
    );

    assertEquals(req.getPath(), "/2/hits");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopHits with all parameters")
  void getTopHitsTest1() {
    String index0 = "index";

    String search0 = "mySearch";

    boolean clickAnalytics0 = true;

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    int limit0 = 21;

    int offset0 = 42;

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopHits(
          index0,
          search0,
          clickAnalytics0,
          startDate0,
          endDate0,
          limit0,
          offset0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/hits");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"search\":\"mySearch\",\"clickAnalytics\":\"true\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"limit\":\"21\",\"offset\":\"42\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopSearches with minimal parameters")
  void getTopSearchesTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopSearches(index0);
      }
    );

    assertEquals(req.getPath(), "/2/searches");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getTopSearches with all parameters")
  void getTopSearchesTest1() {
    String index0 = "index";

    boolean clickAnalytics0 = true;

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    OrderBy orderBy0 = OrderBy.fromValue("searchCount");

    Direction direction0 = Direction.fromValue("asc");

    int limit0 = 21;

    int offset0 = 42;

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopSearches(
          index0,
          clickAnalytics0,
          startDate0,
          endDate0,
          orderBy0,
          direction0,
          limit0,
          offset0,
          tags0
        );
      }
    );

    assertEquals(req.getPath(), "/2/searches");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"clickAnalytics\":\"true\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"orderBy\":\"searchCount\",\"direction\":\"asc\",\"limit\":\"21\",\"offset\":\"42\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getUsersCount with minimal parameters")
  void getUsersCountTest0() {
    String index0 = "index";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getUsersCount(index0);
      }
    );

    assertEquals(req.getPath(), "/2/users/count");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("get getUsersCount with all parameters")
  void getUsersCountTest1() {
    String index0 = "index";

    String startDate0 = "1999-09-19";

    String endDate0 = "2001-01-01";

    String tags0 = "tag";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getUsersCount(index0, startDate0, endDate0, tags0);
      }
    );

    assertEquals(req.getPath(), "/2/users/count");
    assertEquals(req.getMethod(), "GET");

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"index\":\"index\",\"startDate\":\"1999-09-19\",\"endDate\":\"2001-01-01\",\"tags\":\"tag\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("allow post method for a custom path with minimal parameters")
  void postTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.post(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("allow post method for a custom path with all parameters")
  void postTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    Map<String, String> body0 = new HashMap<>();
    {
      String body1 = "parameters";

      body0.put("body", body1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.post(path0, parameters0, body0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"body\":\"parameters\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }

  @Test
  @DisplayName("allow put method for a custom path with minimal parameters")
  void putTest0() {
    String path0 = "/test/minimal";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.put(path0);
      }
    );

    assertEquals(req.getPath(), "/1/test/minimal");
    assertEquals(req.getMethod(), "PUT");
  }

  @Test
  @DisplayName("allow put method for a custom path with all parameters")
  void putTest1() {
    String path0 = "/test/all";

    Map<String, Object> parameters0 = new HashMap<>();
    {
      String query1 = "parameters";

      parameters0.put("query", query1);
    }

    Map<String, String> body0 = new HashMap<>();
    {
      String body1 = "parameters";

      body0.put("body", body1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.put(path0, parameters0, body0);
      }
    );

    assertEquals(req.getPath(), "/1/test/all");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"body\":\"parameters\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    Map<String, String> expectedQuery = JSON.deserialize(
      "{\"query\":\"parameters\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> actualQuery = req.getQueryParams();
    for (Map.Entry<String, String> entry : expectedQuery.entrySet()) {
      boolean found = false;
      for (Pair p : actualQuery) {
        if (
          p.getName().equals(entry.getKey()) &&
          p.getValue().equals(entry.getValue())
        ) {
          found = true;
        }
      }
      assertTrue(
        found,
        "Query parameter " + entry.getKey() + " not found in the actual query"
      );
    }
  }
}
