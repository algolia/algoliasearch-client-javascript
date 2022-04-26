package com.algolia.methods.requests;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.algolia.JSON;
import com.algolia.Pair;
import com.algolia.api.RecommendClient;
import com.algolia.model.recommend.*;
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
class RecommendClientTests {

  private RecommendClient client;

  @BeforeAll
  void init() {
    client = new RecommendClient("appId", "apiKey", new EchoRequester());
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
  @DisplayName(
    "get recommendations for recommend model with minimal parameters"
  )
  void getRecommendationsTest0() {
    GetRecommendationsParams getRecommendationsParams0 = new GetRecommendationsParams();
    {
      List<RecommendationsRequest> requests1 = new ArrayList<>();
      {
        RecommendationRequest requests_02 = new RecommendationRequest();
        {
          String indexName3 = "indexName";

          requests_02.setIndexName(indexName3);
          String objectID3 = "objectID";

          requests_02.setObjectID(objectID3);

          RecommendationModels model3 = RecommendationModels.fromValue(
            "related-products"
          );

          requests_02.setModel(model3);

          int threshold3 = 42;

          requests_02.setThreshold(threshold3);
        }
        requests1.add(
          RecommendationsRequest.ofRecommendationRequest(requests_02)
        );
      }
      getRecommendationsParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getRecommendations(getRecommendationsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/recommendations");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"indexName\":\"indexName\",\"objectID\":\"objectID\",\"model\":\"related-products\",\"threshold\":42}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get recommendations for recommend model with all parameters")
  void getRecommendationsTest1() {
    GetRecommendationsParams getRecommendationsParams0 = new GetRecommendationsParams();
    {
      List<RecommendationsRequest> requests1 = new ArrayList<>();
      {
        RecommendationRequest requests_02 = new RecommendationRequest();
        {
          String indexName3 = "indexName";

          requests_02.setIndexName(indexName3);
          String objectID3 = "objectID";

          requests_02.setObjectID(objectID3);

          RecommendationModels model3 = RecommendationModels.fromValue(
            "related-products"
          );

          requests_02.setModel(model3);

          int threshold3 = 42;

          requests_02.setThreshold(threshold3);

          int maxRecommendations3 = 10;

          requests_02.setMaxRecommendations(maxRecommendations3);

          SearchParamsObject queryParameters3 = new SearchParamsObject();
          {
            String query4 = "myQuery";

            queryParameters3.setQuery(query4);

            List<String> facetFilters4 = new ArrayList<>();
            {
              String facetFilters_05 = "query";

              facetFilters4.add(facetFilters_05);
            }
            queryParameters3.setFacetFilters(
              FacetFilters.ofListString(facetFilters4)
            );
          }
          requests_02.setQueryParameters(queryParameters3);

          SearchParamsObject fallbackParameters3 = new SearchParamsObject();
          {
            String query4 = "myQuery";

            fallbackParameters3.setQuery(query4);

            List<String> facetFilters4 = new ArrayList<>();
            {
              String facetFilters_05 = "fallback";

              facetFilters4.add(facetFilters_05);
            }
            fallbackParameters3.setFacetFilters(
              FacetFilters.ofListString(facetFilters4)
            );
          }
          requests_02.setFallbackParameters(fallbackParameters3);
        }
        requests1.add(
          RecommendationsRequest.ofRecommendationRequest(requests_02)
        );
      }
      getRecommendationsParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getRecommendations(getRecommendationsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/recommendations");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"indexName\":\"indexName\",\"objectID\":\"objectID\",\"model\":\"related-products\",\"threshold\":42,\"maxRecommendations\":10,\"queryParameters\":{\"query\":\"myQuery\",\"facetFilters\":[\"query\"]},\"fallbackParameters\":{\"query\":\"myQuery\",\"facetFilters\":[\"fallback\"]}}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get recommendations for trending model with minimal parameters")
  void getRecommendationsTest2() {
    GetRecommendationsParams getRecommendationsParams0 = new GetRecommendationsParams();
    {
      List<RecommendationsRequest> requests1 = new ArrayList<>();
      {
        TrendingRequest requests_02 = new TrendingRequest();
        {
          String indexName3 = "indexName";

          requests_02.setIndexName(indexName3);

          TrendingModels model3 = TrendingModels.fromValue("trending-items");

          requests_02.setModel(model3);

          int threshold3 = 42;

          requests_02.setThreshold(threshold3);
        }
        requests1.add(RecommendationsRequest.ofTrendingRequest(requests_02));
      }
      getRecommendationsParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getRecommendations(getRecommendationsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/recommendations");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"indexName\":\"indexName\",\"model\":\"trending-items\",\"threshold\":42}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get recommendations for trending model with all parameters")
  void getRecommendationsTest3() {
    GetRecommendationsParams getRecommendationsParams0 = new GetRecommendationsParams();
    {
      List<RecommendationsRequest> requests1 = new ArrayList<>();
      {
        TrendingRequest requests_02 = new TrendingRequest();
        {
          String indexName3 = "indexName";

          requests_02.setIndexName(indexName3);

          TrendingModels model3 = TrendingModels.fromValue("trending-items");

          requests_02.setModel(model3);

          int threshold3 = 42;

          requests_02.setThreshold(threshold3);

          int maxRecommendations3 = 10;

          requests_02.setMaxRecommendations(maxRecommendations3);
          String facetName3 = "myFacetName";

          requests_02.setFacetName(facetName3);
          String facetValue3 = "myFacetValue";

          requests_02.setFacetValue(facetValue3);

          SearchParamsObject queryParameters3 = new SearchParamsObject();
          {
            String query4 = "myQuery";

            queryParameters3.setQuery(query4);

            List<String> facetFilters4 = new ArrayList<>();
            {
              String facetFilters_05 = "query";

              facetFilters4.add(facetFilters_05);
            }
            queryParameters3.setFacetFilters(
              FacetFilters.ofListString(facetFilters4)
            );
          }
          requests_02.setQueryParameters(queryParameters3);

          SearchParamsObject fallbackParameters3 = new SearchParamsObject();
          {
            String query4 = "myQuery";

            fallbackParameters3.setQuery(query4);

            List<String> facetFilters4 = new ArrayList<>();
            {
              String facetFilters_05 = "fallback";

              facetFilters4.add(facetFilters_05);
            }
            fallbackParameters3.setFacetFilters(
              FacetFilters.ofListString(facetFilters4)
            );
          }
          requests_02.setFallbackParameters(fallbackParameters3);
        }
        requests1.add(RecommendationsRequest.ofTrendingRequest(requests_02));
      }
      getRecommendationsParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getRecommendations(getRecommendationsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/recommendations");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"indexName\":\"indexName\",\"model\":\"trending-items\",\"threshold\":42,\"maxRecommendations\":10,\"facetName\":\"myFacetName\",\"facetValue\":\"myFacetValue\",\"queryParameters\":{\"query\":\"myQuery\",\"facetFilters\":[\"query\"]},\"fallbackParameters\":{\"query\":\"myQuery\",\"facetFilters\":[\"fallback\"]}}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get multiple recommendations with minimal parameters")
  void getRecommendationsTest4() {
    GetRecommendationsParams getRecommendationsParams0 = new GetRecommendationsParams();
    {
      List<RecommendationsRequest> requests1 = new ArrayList<>();
      {
        RecommendationRequest requests_02 = new RecommendationRequest();
        {
          String indexName3 = "indexName1";

          requests_02.setIndexName(indexName3);
          String objectID3 = "objectID1";

          requests_02.setObjectID(objectID3);

          RecommendationModels model3 = RecommendationModels.fromValue(
            "related-products"
          );

          requests_02.setModel(model3);

          int threshold3 = 21;

          requests_02.setThreshold(threshold3);
        }
        requests1.add(
          RecommendationsRequest.ofRecommendationRequest(requests_02)
        );

        RecommendationRequest requests_12 = new RecommendationRequest();
        {
          String indexName3 = "indexName2";

          requests_12.setIndexName(indexName3);
          String objectID3 = "objectID2";

          requests_12.setObjectID(objectID3);

          RecommendationModels model3 = RecommendationModels.fromValue(
            "related-products"
          );

          requests_12.setModel(model3);

          int threshold3 = 21;

          requests_12.setThreshold(threshold3);
        }
        requests1.add(
          RecommendationsRequest.ofRecommendationRequest(requests_12)
        );
      }
      getRecommendationsParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getRecommendations(getRecommendationsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/recommendations");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"indexName\":\"indexName1\",\"objectID\":\"objectID1\",\"model\":\"related-products\",\"threshold\":21},{\"indexName\":\"indexName2\",\"objectID\":\"objectID2\",\"model\":\"related-products\",\"threshold\":21}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get multiple recommendations with all parameters")
  void getRecommendationsTest5() {
    GetRecommendationsParams getRecommendationsParams0 = new GetRecommendationsParams();
    {
      List<RecommendationsRequest> requests1 = new ArrayList<>();
      {
        RecommendationRequest requests_02 = new RecommendationRequest();
        {
          String indexName3 = "indexName1";

          requests_02.setIndexName(indexName3);
          String objectID3 = "objectID1";

          requests_02.setObjectID(objectID3);

          RecommendationModels model3 = RecommendationModels.fromValue(
            "related-products"
          );

          requests_02.setModel(model3);

          int threshold3 = 21;

          requests_02.setThreshold(threshold3);

          int maxRecommendations3 = 10;

          requests_02.setMaxRecommendations(maxRecommendations3);

          SearchParamsObject queryParameters3 = new SearchParamsObject();
          {
            String query4 = "myQuery";

            queryParameters3.setQuery(query4);

            List<String> facetFilters4 = new ArrayList<>();
            {
              String facetFilters_05 = "query1";

              facetFilters4.add(facetFilters_05);
            }
            queryParameters3.setFacetFilters(
              FacetFilters.ofListString(facetFilters4)
            );
          }
          requests_02.setQueryParameters(queryParameters3);

          SearchParamsObject fallbackParameters3 = new SearchParamsObject();
          {
            String query4 = "myQuery";

            fallbackParameters3.setQuery(query4);

            List<String> facetFilters4 = new ArrayList<>();
            {
              String facetFilters_05 = "fallback1";

              facetFilters4.add(facetFilters_05);
            }
            fallbackParameters3.setFacetFilters(
              FacetFilters.ofListString(facetFilters4)
            );
          }
          requests_02.setFallbackParameters(fallbackParameters3);
        }
        requests1.add(
          RecommendationsRequest.ofRecommendationRequest(requests_02)
        );

        RecommendationRequest requests_12 = new RecommendationRequest();
        {
          String indexName3 = "indexName2";

          requests_12.setIndexName(indexName3);
          String objectID3 = "objectID2";

          requests_12.setObjectID(objectID3);

          RecommendationModels model3 = RecommendationModels.fromValue(
            "related-products"
          );

          requests_12.setModel(model3);

          int threshold3 = 21;

          requests_12.setThreshold(threshold3);

          int maxRecommendations3 = 10;

          requests_12.setMaxRecommendations(maxRecommendations3);

          SearchParamsObject queryParameters3 = new SearchParamsObject();
          {
            String query4 = "myQuery";

            queryParameters3.setQuery(query4);

            List<String> facetFilters4 = new ArrayList<>();
            {
              String facetFilters_05 = "query2";

              facetFilters4.add(facetFilters_05);
            }
            queryParameters3.setFacetFilters(
              FacetFilters.ofListString(facetFilters4)
            );
          }
          requests_12.setQueryParameters(queryParameters3);

          SearchParamsObject fallbackParameters3 = new SearchParamsObject();
          {
            String query4 = "myQuery";

            fallbackParameters3.setQuery(query4);

            List<String> facetFilters4 = new ArrayList<>();
            {
              String facetFilters_05 = "fallback2";

              facetFilters4.add(facetFilters_05);
            }
            fallbackParameters3.setFacetFilters(
              FacetFilters.ofListString(facetFilters4)
            );
          }
          requests_12.setFallbackParameters(fallbackParameters3);
        }
        requests1.add(
          RecommendationsRequest.ofRecommendationRequest(requests_12)
        );
      }
      getRecommendationsParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getRecommendations(getRecommendationsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/recommendations");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"indexName\":\"indexName1\",\"objectID\":\"objectID1\",\"model\":\"related-products\",\"threshold\":21,\"maxRecommendations\":10,\"queryParameters\":{\"query\":\"myQuery\",\"facetFilters\":[\"query1\"]},\"fallbackParameters\":{\"query\":\"myQuery\",\"facetFilters\":[\"fallback1\"]}},{\"indexName\":\"indexName2\",\"objectID\":\"objectID2\",\"model\":\"related-products\",\"threshold\":21,\"maxRecommendations\":10,\"queryParameters\":{\"query\":\"myQuery\",\"facetFilters\":[\"query2\"]},\"fallbackParameters\":{\"query\":\"myQuery\",\"facetFilters\":[\"fallback2\"]}}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get frequently bought together recommendations")
  void getRecommendationsTest6() {
    GetRecommendationsParams getRecommendationsParams0 = new GetRecommendationsParams();
    {
      List<RecommendationsRequest> requests1 = new ArrayList<>();
      {
        RecommendationRequest requests_02 = new RecommendationRequest();
        {
          String indexName3 = "indexName1";

          requests_02.setIndexName(indexName3);
          String objectID3 = "objectID1";

          requests_02.setObjectID(objectID3);

          RecommendationModels model3 = RecommendationModels.fromValue(
            "bought-together"
          );

          requests_02.setModel(model3);

          int threshold3 = 42;

          requests_02.setThreshold(threshold3);
        }
        requests1.add(
          RecommendationsRequest.ofRecommendationRequest(requests_02)
        );
      }
      getRecommendationsParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getRecommendations(getRecommendationsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/recommendations");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"indexName\":\"indexName1\",\"objectID\":\"objectID1\",\"model\":\"bought-together\",\"threshold\":42}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
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
