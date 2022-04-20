package com.algolia.methods.requests;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.algolia.JSON;
import com.algolia.Pair;
import com.algolia.api.QuerySuggestionsClient;
import com.algolia.model.querySuggestions.*;
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
class QuerySuggestionsClientTests {

  private QuerySuggestionsClient client;

  @BeforeAll
  void init() {
    client = new QuerySuggestionsClient("appId", "apiKey", new EchoRequester());
  }

  @Test
  @DisplayName("createConfig")
  void createConfigTest0() {
    QuerySuggestionsIndexWithIndexParam querySuggestionsIndexWithIndexParam0 = new QuerySuggestionsIndexWithIndexParam();
    {
      String indexName1 = "theIndexName";

      querySuggestionsIndexWithIndexParam0.setIndexName(indexName1);

      List<SourceIndex> sourceIndices1 = new ArrayList<>();
      {
        SourceIndex sourceIndices_02 = new SourceIndex();
        {
          String indexName3 = "testIndex";

          sourceIndices_02.setIndexName(indexName3);

          List<Object> facets3 = new ArrayList<>();
          {
            Map<String, String> facets_04 = new HashMap<>();
            {
              String attributes5 = "test";

              facets_04.put("attributes", attributes5);
            }
            facets3.add(facets_04);
          }
          sourceIndices_02.setFacets(facets3);

          List<List<String>> generate3 = new ArrayList<>();
          {
            List<String> generate_04 = new ArrayList<>();
            {
              String generate_0_05 = "facetA";

              generate_04.add(generate_0_05);
              String generate_0_15 = "facetB";

              generate_04.add(generate_0_15);
            }
            generate3.add(generate_04);

            List<String> generate_14 = new ArrayList<>();
            {
              String generate_1_05 = "facetC";

              generate_14.add(generate_1_05);
            }
            generate3.add(generate_14);
          }
          sourceIndices_02.setGenerate(generate3);
        }
        sourceIndices1.add(sourceIndices_02);
      }
      querySuggestionsIndexWithIndexParam0.setSourceIndices(sourceIndices1);

      List<String> languages1 = new ArrayList<>();
      {
        String languages_02 = "french";

        languages1.add(languages_02);
      }
      querySuggestionsIndexWithIndexParam0.setLanguages(languages1);

      List<String> exclude1 = new ArrayList<>();
      {
        String exclude_02 = "test";

        exclude1.add(exclude_02);
      }
      querySuggestionsIndexWithIndexParam0.setExclude(exclude1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.createConfig(querySuggestionsIndexWithIndexParam0);
      }
    );

    assertEquals(req.getPath(), "/1/configs");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"indexName\":\"theIndexName\",\"sourceIndices\":[{\"indexName\":\"testIndex\",\"facets\":[{\"attributes\":\"test\"}],\"generate\":[[\"facetA\",\"facetB\"],[\"facetC\"]]}],\"languages\":[\"french\"],\"exclude\":[\"test\"]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
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
  @DisplayName("deleteConfig")
  void deleteConfigTest0() {
    String indexName0 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteConfig(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/configs/theIndexName");
    assertEquals(req.getMethod(), "DELETE");
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
  @DisplayName("getAllConfigs")
  void getAllConfigsTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getAllConfigs();
      }
    );

    assertEquals(req.getPath(), "/1/configs");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getConfig")
  void getConfigTest0() {
    String indexName0 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getConfig(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/configs/theIndexName");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getConfigStatus")
  void getConfigStatusTest0() {
    String indexName0 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getConfigStatus(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/configs/theIndexName/status");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getLogFile")
  void getLogFileTest0() {
    String indexName0 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getLogFile(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/logs/theIndexName");
    assertEquals(req.getMethod(), "GET");
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

  @Test
  @DisplayName("updateConfig")
  void updateConfigTest0() {
    String indexName0 = "theIndexName";

    QuerySuggestionsIndexParam querySuggestionsIndexParam0 = new QuerySuggestionsIndexParam();
    {
      List<SourceIndex> sourceIndices1 = new ArrayList<>();
      {
        SourceIndex sourceIndices_02 = new SourceIndex();
        {
          String indexName3 = "testIndex";

          sourceIndices_02.setIndexName(indexName3);

          List<Object> facets3 = new ArrayList<>();
          {
            Map<String, String> facets_04 = new HashMap<>();
            {
              String attributes5 = "test";

              facets_04.put("attributes", attributes5);
            }
            facets3.add(facets_04);
          }
          sourceIndices_02.setFacets(facets3);

          List<List<String>> generate3 = new ArrayList<>();
          {
            List<String> generate_04 = new ArrayList<>();
            {
              String generate_0_05 = "facetA";

              generate_04.add(generate_0_05);
              String generate_0_15 = "facetB";

              generate_04.add(generate_0_15);
            }
            generate3.add(generate_04);

            List<String> generate_14 = new ArrayList<>();
            {
              String generate_1_05 = "facetC";

              generate_14.add(generate_1_05);
            }
            generate3.add(generate_14);
          }
          sourceIndices_02.setGenerate(generate3);
        }
        sourceIndices1.add(sourceIndices_02);
      }
      querySuggestionsIndexParam0.setSourceIndices(sourceIndices1);

      List<String> languages1 = new ArrayList<>();
      {
        String languages_02 = "french";

        languages1.add(languages_02);
      }
      querySuggestionsIndexParam0.setLanguages(languages1);

      List<String> exclude1 = new ArrayList<>();
      {
        String exclude_02 = "test";

        exclude1.add(exclude_02);
      }
      querySuggestionsIndexParam0.setExclude(exclude1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.updateConfig(indexName0, querySuggestionsIndexParam0);
      }
    );

    assertEquals(req.getPath(), "/1/configs/theIndexName");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"sourceIndices\":[{\"indexName\":\"testIndex\",\"facets\":[{\"attributes\":\"test\"}],\"generate\":[[\"facetA\",\"facetB\"],[\"facetC\"]]}],\"languages\":[\"french\"],\"exclude\":[\"test\"]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }
}
