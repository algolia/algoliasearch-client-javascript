package com.algolia.methods.requests;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;

import com.algolia.JSON;
import com.algolia.Pair;
import com.algolia.model.search.*;
import com.algolia.search.SearchApi;
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
class SearchApiTests {

  private SearchApi client;

  @BeforeAll
  void init() {
    client = new SearchApi("appId", "apiKey", new EchoRequester());
  }

  @Test
  @DisplayName("addApiKey")
  void addApiKeyTest0() {
    ApiKey apiKey0 = new ApiKey();
    {
      List acl1 = new ArrayList();
      {
        Acl acl_02 = Acl.fromValue("search");

        acl1.add(acl_02);

        Acl acl_12 = Acl.fromValue("addObject");

        acl1.add(acl_12);
      }

      apiKey0.setAcl(acl1);
      String description1 = "my new api key";

      apiKey0.setDescription(description1);

      int validity1 = 300;

      apiKey0.setValidity(validity1);

      int maxQueriesPerIPPerHour1 = 100;

      apiKey0.setMaxQueriesPerIPPerHour(maxQueriesPerIPPerHour1);

      int maxHitsPerQuery1 = 20;

      apiKey0.setMaxHitsPerQuery(maxHitsPerQuery1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.addApiKey(apiKey0);
      }
    );

    assertEquals(req.getPath(), "/1/keys");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"acl\":[\"search\",\"addObject\"],\"description\":\"my new api" +
        " key\",\"validity\":300,\"maxQueriesPerIPPerHour\":100,\"maxHitsPerQuery\":20}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("addOrUpdateObject")
  void addOrUpdateObjectTest0() {
    String indexName0 = "indexName";

    String objectID0 = "uniqueID";

    HashMap body0 = new HashMap<String, Object>();
    {
      String key1 = "value";

      body0.put("key", key1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.addOrUpdateObject(indexName0, objectID0, body0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/uniqueID");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"key\":\"value\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("appendSource")
  void appendSourceTest0() {
    Source source0 = new Source();
    {
      String source1 = "theSource";

      source0.setSource(source1);
      String description1 = "theDescription";

      source0.setDescription(description1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.appendSource(source0);
      }
    );

    assertEquals(req.getPath(), "/1/security/sources/append");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"source\":\"theSource\",\"description\":\"theDescription\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("assignUserId")
  void assignUserIdTest0() {
    String xAlgoliaUserID0 = "userID";

    AssignUserIdParams assignUserIdParams0 = new AssignUserIdParams();
    {
      String cluster1 = "theCluster";

      assignUserIdParams0.setCluster(cluster1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.assignUserId(xAlgoliaUserID0, assignUserIdParams0);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"cluster\":\"theCluster\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"X-Algolia-User-ID\":\"userID\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("batch")
  void batchTest0() {
    String indexName0 = "theIndexName";

    BatchWriteParams batchWriteParams0 = new BatchWriteParams();
    {
      List requests1 = new ArrayList();
      {
        BatchOperation requests_02 = new BatchOperation();
        {
          Action action3 = Action.fromValue("delete");

          requests_02.setAction(action3);

          HashMap body3 = new HashMap<String, Object>();
          {
            String key4 = "value";

            body3.put("key", key4);
          }
          requests_02.setBody(body3);
        }
        requests1.add(requests_02);
      }

      batchWriteParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batch(indexName0, batchWriteParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"action\":\"delete\",\"body\":{\"key\":\"value\"}}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("batchAssignUserIds")
  void batchAssignUserIdsTest0() {
    String xAlgoliaUserID0 = "userID";

    BatchAssignUserIdsParams batchAssignUserIdsParams0 = new BatchAssignUserIdsParams();
    {
      String cluster1 = "theCluster";

      batchAssignUserIdsParams0.setCluster(cluster1);

      List users1 = new ArrayList();
      {
        String users_02 = "user1";

        users1.add(users_02);
        String users_12 = "user2";

        users1.add(users_12);
      }

      batchAssignUserIdsParams0.setUsers(users1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batchAssignUserIds(
          xAlgoliaUserID0,
          batchAssignUserIdsParams0
        );
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"cluster\":\"theCluster\",\"users\":[\"user1\",\"user2\"]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"X-Algolia-User-ID\":\"userID\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("get batchDictionaryEntries results with minimal parameters")
  void batchDictionaryEntriesTest0() {
    DictionaryType dictionaryName0 = DictionaryType.fromValue("compounds");

    BatchDictionaryEntriesParams batchDictionaryEntriesParams0 = new BatchDictionaryEntriesParams();
    {
      List requests1 = new ArrayList();
      {
        BatchDictionaryEntriesRequest requests_02 = new BatchDictionaryEntriesRequest();
        {
          DictionaryAction action3 = DictionaryAction.fromValue("addEntry");

          requests_02.setAction(action3);

          DictionaryEntry body3 = new DictionaryEntry();
          {
            String objectID4 = "1";

            body3.setObjectID(objectID4);
            String language4 = "en";

            body3.setLanguage(language4);
          }
          requests_02.setBody(body3);
        }
        requests1.add(requests_02);

        BatchDictionaryEntriesRequest requests_12 = new BatchDictionaryEntriesRequest();
        {
          DictionaryAction action3 = DictionaryAction.fromValue("deleteEntry");

          requests_12.setAction(action3);

          DictionaryEntry body3 = new DictionaryEntry();
          {
            String objectID4 = "2";

            body3.setObjectID(objectID4);
            String language4 = "fr";

            body3.setLanguage(language4);
          }
          requests_12.setBody(body3);
        }
        requests1.add(requests_12);
      }

      batchDictionaryEntriesParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batchDictionaryEntries(
          dictionaryName0,
          batchDictionaryEntriesParams0
        );
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/compounds/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"action\":\"addEntry\",\"body\":{\"objectID\":\"1\",\"language\":\"en\"}},{\"action\":\"deleteEntry\",\"body\":{\"objectID\":\"2\",\"language\":\"fr\"}}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get batchDictionaryEntries results with all parameters")
  void batchDictionaryEntriesTest1() {
    DictionaryType dictionaryName0 = DictionaryType.fromValue("compounds");

    BatchDictionaryEntriesParams batchDictionaryEntriesParams0 = new BatchDictionaryEntriesParams();
    {
      boolean clearExistingDictionaryEntries1 = false;

      batchDictionaryEntriesParams0.setClearExistingDictionaryEntries(
        clearExistingDictionaryEntries1
      );

      List requests1 = new ArrayList();
      {
        BatchDictionaryEntriesRequest requests_02 = new BatchDictionaryEntriesRequest();
        {
          DictionaryAction action3 = DictionaryAction.fromValue("addEntry");

          requests_02.setAction(action3);

          DictionaryEntry body3 = new DictionaryEntry();
          {
            String objectID4 = "1";

            body3.setObjectID(objectID4);
            String language4 = "en";

            body3.setLanguage(language4);
            String word4 = "fancy";

            body3.setWord(word4);

            List words4 = new ArrayList();
            {
              String words_05 = "believe";

              words4.add(words_05);
              String words_15 = "algolia";

              words4.add(words_15);
            }

            body3.setWords(words4);

            List decomposition4 = new ArrayList();
            {
              String decomposition_05 = "trust";

              decomposition4.add(decomposition_05);
              String decomposition_15 = "algolia";

              decomposition4.add(decomposition_15);
            }

            body3.setDecomposition(decomposition4);

            DictionaryEntryState state4 = DictionaryEntryState.fromValue(
              "enabled"
            );

            body3.setState(state4);
          }
          requests_02.setBody(body3);
        }
        requests1.add(requests_02);

        BatchDictionaryEntriesRequest requests_12 = new BatchDictionaryEntriesRequest();
        {
          DictionaryAction action3 = DictionaryAction.fromValue("deleteEntry");

          requests_12.setAction(action3);

          DictionaryEntry body3 = new DictionaryEntry();
          {
            String objectID4 = "2";

            body3.setObjectID(objectID4);
            String language4 = "fr";

            body3.setLanguage(language4);
            String word4 = "humility";

            body3.setWord(word4);

            List words4 = new ArrayList();
            {
              String words_05 = "candor";

              words4.add(words_05);
              String words_15 = "algolia";

              words4.add(words_15);
            }

            body3.setWords(words4);

            List decomposition4 = new ArrayList();
            {
              String decomposition_05 = "grit";

              decomposition4.add(decomposition_05);
              String decomposition_15 = "algolia";

              decomposition4.add(decomposition_15);
            }

            body3.setDecomposition(decomposition4);

            DictionaryEntryState state4 = DictionaryEntryState.fromValue(
              "enabled"
            );

            body3.setState(state4);
          }
          requests_12.setBody(body3);
        }
        requests1.add(requests_12);
      }

      batchDictionaryEntriesParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batchDictionaryEntries(
          dictionaryName0,
          batchDictionaryEntriesParams0
        );
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/compounds/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"clearExistingDictionaryEntries\":false,\"requests\":[{\"action\":\"addEntry\",\"body\":{\"objectID\":\"1\",\"language\":\"en\",\"word\":\"fancy\",\"words\":[\"believe\",\"algolia\"],\"decomposition\":[\"trust\",\"algolia\"],\"state\":\"enabled\"}},{\"action\":\"deleteEntry\",\"body\":{\"objectID\":\"2\",\"language\":\"fr\",\"word\":\"humility\",\"words\":[\"candor\",\"algolia\"],\"decomposition\":[\"grit\",\"algolia\"],\"state\":\"enabled\"}}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("batchRules")
  void batchRulesTest0() {
    String indexName0 = "indexName";

    List rule0 = new ArrayList();
    {
      Rule rule_01 = new Rule();
      {
        String objectID2 = "a-rule-id";

        rule_01.setObjectID(objectID2);

        List conditions2 = new ArrayList();
        {
          Condition conditions_03 = new Condition();
          {
            String pattern4 = "smartphone";

            conditions_03.setPattern(pattern4);

            Anchoring anchoring4 = Anchoring.fromValue("contains");

            conditions_03.setAnchoring(anchoring4);
          }
          conditions2.add(conditions_03);
        }

        rule_01.setConditions(conditions2);

        Consequence consequence2 = new Consequence();
        {
          ConsequenceParams params3 = new ConsequenceParams();
          {
            String filters4 = "category:smartphone";

            params3.setFilters(filters4);
          }
          consequence2.setParams(params3);
        }
        rule_01.setConsequence(consequence2);
      }
      rule0.add(rule_01);

      Rule rule_11 = new Rule();
      {
        String objectID2 = "a-second-rule-id";

        rule_11.setObjectID(objectID2);

        List conditions2 = new ArrayList();
        {
          Condition conditions_03 = new Condition();
          {
            String pattern4 = "apple";

            conditions_03.setPattern(pattern4);

            Anchoring anchoring4 = Anchoring.fromValue("contains");

            conditions_03.setAnchoring(anchoring4);
          }
          conditions2.add(conditions_03);
        }

        rule_11.setConditions(conditions2);

        Consequence consequence2 = new Consequence();
        {
          ConsequenceParams params3 = new ConsequenceParams();
          {
            String filters4 = "brand:apple";

            params3.setFilters(filters4);
          }
          consequence2.setParams(params3);
        }
        rule_11.setConsequence(consequence2);
      }
      rule0.add(rule_11);
    }

    boolean forwardToReplicas0 = true;

    boolean clearExistingRules0 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.batchRules(
          indexName0,
          rule0,
          forwardToReplicas0,
          clearExistingRules0
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "[{\"objectID\":\"a-rule-id\",\"conditions\":[{\"pattern\":\"smartphone\",\"anchoring\":\"contains\"}],\"consequence\":{\"params\":{\"filters\":\"category:smartphone\"}}},{\"objectID\":\"a-second-rule-id\",\"conditions\":[{\"pattern\":\"apple\",\"anchoring\":\"contains\"}],\"consequence\":{\"params\":{\"filters\":\"brand:apple\"}}}]",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"forwardToReplicas\":\"true\",\"clearExistingRules\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("get browse results with minimal parameters")
  void browseTest0() {
    String indexName0 = "indexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.browse(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/browse");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("get browse results with all parameters")
  void browseTest1() {
    String indexName0 = "indexName";

    BrowseRequest browseRequest0 = new BrowseRequest();
    {
      String params1 = "query=foo&facetFilters=['bar']";

      browseRequest0.setParams(params1);
      String cursor1 = "cts";

      browseRequest0.setCursor(cursor1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.browse(indexName0, browseRequest0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/browse");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"params\":\"query=foo&facetFilters=['bar']\",\"cursor\":\"cts\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("clearAllSynonyms")
  void clearAllSynonymsTest0() {
    String indexName0 = "indexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.clearAllSynonyms(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/clear");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("clearObjects")
  void clearObjectsTest0() {
    String indexName0 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.clearObjects(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/clear");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("clearRules")
  void clearRulesTest0() {
    String indexName0 = "indexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.clearRules(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/clear");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("deleteApiKey")
  void deleteApiKeyTest0() {
    String key0 = "myTestApiKey";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteApiKey(key0);
      }
    );

    assertEquals(req.getPath(), "/1/keys/myTestApiKey");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteBy")
  void deleteByTest0() {
    String indexName0 = "theIndexName";

    SearchParamsObject searchParams0 = new SearchParamsObject();
    {
      String query1 = "testQuery";

      searchParams0.setQuery(query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteBy(
          indexName0,
          SearchParams.ofSearchParamsObject(searchParams0)
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/deleteByQuery");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"testQuery\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("deleteIndex")
  void deleteIndexTest0() {
    String indexName0 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteIndex(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteObject")
  void deleteObjectTest0() {
    String indexName0 = "theIndexName";

    String objectID0 = "uniqueID";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteObject(indexName0, objectID0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/uniqueID");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteRule")
  void deleteRuleTest0() {
    String indexName0 = "indexName";

    String objectID0 = "id1";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteRule(indexName0, objectID0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/id1");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteSource")
  void deleteSourceTest0() {
    String source0 = "theSource";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteSource(source0);
      }
    );

    assertEquals(req.getPath(), "/1/security/sources/theSource");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("deleteSynonym")
  void deleteSynonymTest0() {
    String indexName0 = "indexName";

    String objectID0 = "id1";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.deleteSynonym(indexName0, objectID0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/id1");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("getApiKey")
  void getApiKeyTest0() {
    String key0 = "myTestApiKey";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getApiKey(key0);
      }
    );

    assertEquals(req.getPath(), "/1/keys/myTestApiKey");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("get getDictionaryLanguages")
  void getDictionaryLanguagesTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getDictionaryLanguages();
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/*/languages");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("get getDictionarySettings results")
  void getDictionarySettingsTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getDictionarySettings();
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/*/settings");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getLogs")
  void getLogsTest0() {
    int offset0 = 5;

    int length0 = 10;

    String indexName0 = "theIndexName";

    LogType type0 = LogType.fromValue("all");

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getLogs(offset0, length0, indexName0, type0);
      }
    );

    assertEquals(req.getPath(), "/1/logs");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"offset\":\"5\",\"length\":\"10\",\"indexName\":\"theIndexName\",\"type\":\"all\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("getObject")
  void getObjectTest0() {
    String indexName0 = "theIndexName";

    String objectID0 = "uniqueID";

    List attributesToRetrieve0 = new ArrayList();
    {
      String attributesToRetrieve_01 = "attr1";

      attributesToRetrieve0.add(attributesToRetrieve_01);
      String attributesToRetrieve_11 = "attr2";

      attributesToRetrieve0.add(attributesToRetrieve_11);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getObject(indexName0, objectID0, attributesToRetrieve0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/uniqueID");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"attributesToRetrieve\":\"attr1,attr2\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("getObjects")
  void getObjectsTest0() {
    GetObjectsParams getObjectsParams0 = new GetObjectsParams();
    {
      List requests1 = new ArrayList();
      {
        MultipleGetObjectsParams requests_02 = new MultipleGetObjectsParams();
        {
          List attributesToRetrieve3 = new ArrayList();
          {
            String attributesToRetrieve_04 = "attr1";

            attributesToRetrieve3.add(attributesToRetrieve_04);
            String attributesToRetrieve_14 = "attr2";

            attributesToRetrieve3.add(attributesToRetrieve_14);
          }

          requests_02.setAttributesToRetrieve(attributesToRetrieve3);
          String objectID3 = "uniqueID";

          requests_02.setObjectID(objectID3);
          String indexName3 = "theIndexName";

          requests_02.setIndexName(indexName3);
        }
        requests1.add(requests_02);
      }

      getObjectsParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getObjects(getObjectsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/objects");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"attributesToRetrieve\":[\"attr1\",\"attr2\"],\"objectID\":\"uniqueID\",\"indexName\":\"theIndexName\"}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("getRule")
  void getRuleTest0() {
    String indexName0 = "indexName";

    String objectID0 = "id1";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getRule(indexName0, objectID0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/id1");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getSettings")
  void getSettingsTest0() {
    String indexName0 = "theIndexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSettings(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/settings");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getSources")
  void getSourcesTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSources();
      }
    );

    assertEquals(req.getPath(), "/1/security/sources");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getSynonym")
  void getSynonymTest0() {
    String indexName0 = "indexName";

    String objectID0 = "id1";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getSynonym(indexName0, objectID0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/id1");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getTask")
  void getTaskTest0() {
    String indexName0 = "theIndexName";

    int taskID0 = 123;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTask(indexName0, taskID0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/task/123");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getTopUserIds")
  void getTopUserIdsTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getTopUserIds();
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/top");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("getUserId")
  void getUserIdTest0() {
    String userID0 = "uniqueID";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.getUserId(userID0);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/uniqueID");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("hasPendingMappings")
  void hasPendingMappingsTest0() {
    boolean getClusters0 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.hasPendingMappings(getClusters0);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/pending");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"getClusters\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("listApiKeys")
  void listApiKeysTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.listApiKeys();
      }
    );

    assertEquals(req.getPath(), "/1/keys");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("listClusters")
  void listClustersTest0() {
    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.listClusters();
      }
    );

    assertEquals(req.getPath(), "/1/clusters");
    assertEquals(req.getMethod(), "GET");
  }

  @Test
  @DisplayName("listIndices")
  void listIndicesTest0() {
    int page0 = 8;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.listIndices(page0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"page\":\"8\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("listUserIds")
  void listUserIdsTest0() {
    int page0 = 8;

    int hitsPerPage0 = 100;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.listUserIds(page0, hitsPerPage0);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping");
    assertEquals(req.getMethod(), "GET");

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"page\":\"8\",\"hitsPerPage\":\"100\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("multipleBatch")
  void multipleBatchTest0() {
    BatchParams batchParams0 = new BatchParams();
    {
      List requests1 = new ArrayList();
      {
        MultipleBatchOperation requests_02 = new MultipleBatchOperation();
        {
          Action action3 = Action.fromValue("addObject");

          requests_02.setAction(action3);

          HashMap body3 = new HashMap<String, Object>();
          {
            String key4 = "value";

            body3.put("key", key4);
          }
          requests_02.setBody(body3);
          String indexName3 = "theIndexName";

          requests_02.setIndexName(indexName3);
        }
        requests1.add(requests_02);
      }

      batchParams0.setRequests(requests1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.multipleBatch(batchParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"action\":\"addObject\",\"body\":{\"key\":\"value\"},\"indexName\":\"theIndexName\"}]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("multipleQueries")
  void multipleQueriesTest0() {
    MultipleQueriesParams multipleQueriesParams0 = new MultipleQueriesParams();
    {
      List requests1 = new ArrayList();
      {
        MultipleQueries requests_02 = new MultipleQueries();
        {
          String indexName3 = "theIndexName";

          requests_02.setIndexName(indexName3);
          String query3 = "test";

          requests_02.setQuery(query3);

          MultipleQueriesType type3 = MultipleQueriesType.fromValue("facet");

          requests_02.setType(type3);
          String facet3 = "theFacet";

          requests_02.setFacet(facet3);
          String params3 = "testParam";

          requests_02.setParams(params3);
        }
        requests1.add(requests_02);
      }

      multipleQueriesParams0.setRequests(requests1);

      MultipleQueriesStrategy strategy1 = MultipleQueriesStrategy.fromValue(
        "stopIfEnoughMatches"
      );

      multipleQueriesParams0.setStrategy(strategy1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.multipleQueries(multipleQueriesParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/*/queries");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"requests\":[{\"indexName\":\"theIndexName\",\"query\":\"test\",\"type\":\"facet\",\"facet\":\"theFacet\",\"params\":\"testParam\"}],\"strategy\":\"stopIfEnoughMatches\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("operationIndex")
  void operationIndexTest0() {
    String indexName0 = "theIndexName";

    OperationIndexParams operationIndexParams0 = new OperationIndexParams();
    {
      OperationType operation1 = OperationType.fromValue("copy");

      operationIndexParams0.setOperation(operation1);
      String destination1 = "dest";

      operationIndexParams0.setDestination(destination1);

      List scope1 = new ArrayList();
      {
        ScopeType scope_02 = ScopeType.fromValue("rules");

        scope1.add(scope_02);

        ScopeType scope_12 = ScopeType.fromValue("settings");

        scope1.add(scope_12);
      }

      operationIndexParams0.setScope(scope1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.operationIndex(indexName0, operationIndexParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/operation");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"operation\":\"copy\",\"destination\":\"dest\",\"scope\":[\"rules\",\"settings\"]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("partialUpdateObject")
  void partialUpdateObjectTest0() {
    String indexName0 = "theIndexName";

    String objectID0 = "uniqueID";

    List attributeOrBuiltInOperation0 = new ArrayList();
    {
      HashMap attributeOrBuiltInOperation_01 = new HashMap<String, Object>();
      {
        String id12 = "test";

        attributeOrBuiltInOperation_01.put("id1", id12);

        BuiltInOperation id22 = new BuiltInOperation();
        {
          BuiltInOperationType operation3 = BuiltInOperationType.fromValue(
            "AddUnique"
          );

          id22.setOperation(operation3);
          String value3 = "test2";

          id22.setValue(value3);
        }
        attributeOrBuiltInOperation_01.put("id2", id22);
      }
      attributeOrBuiltInOperation0.add(attributeOrBuiltInOperation_01);
    }

    boolean createIfNotExists0 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.partialUpdateObject(
          indexName0,
          objectID0,
          attributeOrBuiltInOperation0,
          createIfNotExists0
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/uniqueID/partial");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "[{\"id1\":\"test\",\"id2\":{\"_operation\":\"AddUnique\",\"value\":\"test2\"}}]",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"createIfNotExists\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("removeUserId")
  void removeUserIdTest0() {
    String userID0 = "uniqueID";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.removeUserId(userID0);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/uniqueID");
    assertEquals(req.getMethod(), "DELETE");
  }

  @Test
  @DisplayName("replaceSources")
  void replaceSourcesTest0() {
    List source0 = new ArrayList();
    {
      Source source_01 = new Source();
      {
        String source2 = "theSource";

        source_01.setSource(source2);
        String description2 = "theDescription";

        source_01.setDescription(description2);
      }
      source0.add(source_01);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.replaceSources(source0);
      }
    );

    assertEquals(req.getPath(), "/1/security/sources");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "[{\"source\":\"theSource\",\"description\":\"theDescription\"}]",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("restoreApiKey")
  void restoreApiKeyTest0() {
    String key0 = "myApiKey";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.restoreApiKey(key0);
      }
    );

    assertEquals(req.getPath(), "/1/keys/myApiKey/restore");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("saveObject")
  void saveObjectTest0() {
    String indexName0 = "theIndexName";

    HashMap body0 = new HashMap<String, Object>();
    {
      String objectID1 = "id";

      body0.put("objectID", objectID1);
      String test1 = "val";

      body0.put("test", test1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.saveObject(indexName0, body0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"objectID\":\"id\",\"test\":\"val\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("saveRule")
  void saveRuleTest0() {
    String indexName0 = "indexName";

    String objectID0 = "id1";

    Rule rule0 = new Rule();
    {
      String objectID1 = "id1";

      rule0.setObjectID(objectID1);

      List conditions1 = new ArrayList();
      {
        Condition conditions_02 = new Condition();
        {
          String pattern3 = "apple";

          conditions_02.setPattern(pattern3);

          Anchoring anchoring3 = Anchoring.fromValue("contains");

          conditions_02.setAnchoring(anchoring3);
        }
        conditions1.add(conditions_02);
      }

      rule0.setConditions(conditions1);

      Consequence consequence1 = new Consequence();
      {
        ConsequenceParams params2 = new ConsequenceParams();
        {
          String filters3 = "brand:apple";

          params2.setFilters(filters3);
        }
        consequence1.setParams(params2);
      }
      rule0.setConsequence(consequence1);
    }

    boolean forwardToReplicas0 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.saveRule(
          indexName0,
          objectID0,
          rule0,
          forwardToReplicas0
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/id1");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"objectID\":\"id1\",\"conditions\":[{\"pattern\":\"apple\",\"anchoring\":\"contains\"}],\"consequence\":{\"params\":{\"filters\":\"brand:apple\"}}}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"forwardToReplicas\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("saveSynonym")
  void saveSynonymTest0() {
    String indexName0 = "indexName";

    String objectID0 = "id1";

    SynonymHit synonymHit0 = new SynonymHit();
    {
      String objectID1 = "id1";

      synonymHit0.setObjectID(objectID1);

      SynonymType type1 = SynonymType.fromValue("synonym");

      synonymHit0.setType(type1);

      List synonyms1 = new ArrayList();
      {
        String synonyms_02 = "car";

        synonyms1.add(synonyms_02);
        String synonyms_12 = "vehicule";

        synonyms1.add(synonyms_12);
        String synonyms_22 = "auto";

        synonyms1.add(synonyms_22);
      }

      synonymHit0.setSynonyms(synonyms1);
    }

    boolean forwardToReplicas0 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.saveSynonym(
          indexName0,
          objectID0,
          synonymHit0,
          forwardToReplicas0
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/id1");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"objectID\":\"id1\",\"type\":\"synonym\",\"synonyms\":[\"car\",\"vehicule\",\"auto\"]}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"forwardToReplicas\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("saveSynonyms")
  void saveSynonymsTest0() {
    String indexName0 = "indexName";

    List synonymHit0 = new ArrayList();
    {
      SynonymHit synonymHit_01 = new SynonymHit();
      {
        String objectID2 = "id1";

        synonymHit_01.setObjectID(objectID2);

        SynonymType type2 = SynonymType.fromValue("synonym");

        synonymHit_01.setType(type2);

        List synonyms2 = new ArrayList();
        {
          String synonyms_03 = "car";

          synonyms2.add(synonyms_03);
          String synonyms_13 = "vehicule";

          synonyms2.add(synonyms_13);
          String synonyms_23 = "auto";

          synonyms2.add(synonyms_23);
        }

        synonymHit_01.setSynonyms(synonyms2);
      }
      synonymHit0.add(synonymHit_01);

      SynonymHit synonymHit_11 = new SynonymHit();
      {
        String objectID2 = "id2";

        synonymHit_11.setObjectID(objectID2);

        SynonymType type2 = SynonymType.fromValue("onewaysynonym");

        synonymHit_11.setType(type2);
        String input2 = "iphone";

        synonymHit_11.setInput(input2);

        List synonyms2 = new ArrayList();
        {
          String synonyms_03 = "ephone";

          synonyms2.add(synonyms_03);
          String synonyms_13 = "aphone";

          synonyms2.add(synonyms_13);
          String synonyms_23 = "yphone";

          synonyms2.add(synonyms_23);
        }

        synonymHit_11.setSynonyms(synonyms2);
      }
      synonymHit0.add(synonymHit_11);
    }

    boolean forwardToReplicas0 = true;

    boolean replaceExistingSynonyms0 = false;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.saveSynonyms(
          indexName0,
          synonymHit0,
          forwardToReplicas0,
          replaceExistingSynonyms0
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/batch");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "[{\"objectID\":\"id1\",\"type\":\"synonym\",\"synonyms\":[\"car\",\"vehicule\",\"auto\"]},{\"objectID\":\"id2\",\"type\":\"onewaysynonym\",\"input\":\"iphone\",\"synonyms\":[\"ephone\",\"aphone\",\"yphone\"]}]",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"forwardToReplicas\":\"true\",\"replaceExistingSynonyms\":\"false\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("search")
  void searchTest0() {
    String indexName0 = "indexName";

    SearchParamsObject searchParams0 = new SearchParamsObject();
    {
      String query1 = "myQuery";

      searchParams0.setQuery(query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.search(
          indexName0,
          SearchParams.ofSearchParamsObject(searchParams0)
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/query");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"myQuery\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get searchDictionaryEntries results with minimal parameters")
  void searchDictionaryEntriesTest0() {
    DictionaryType dictionaryName0 = DictionaryType.fromValue("compounds");

    SearchDictionaryEntriesParams searchDictionaryEntriesParams0 = new SearchDictionaryEntriesParams();
    {
      String query1 = "foo";

      searchDictionaryEntriesParams0.setQuery(query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchDictionaryEntries(
          dictionaryName0,
          searchDictionaryEntriesParams0
        );
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/compounds/search");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"foo\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get searchDictionaryEntries results with all parameters")
  void searchDictionaryEntriesTest1() {
    DictionaryType dictionaryName0 = DictionaryType.fromValue("compounds");

    SearchDictionaryEntriesParams searchDictionaryEntriesParams0 = new SearchDictionaryEntriesParams();
    {
      String query1 = "foo";

      searchDictionaryEntriesParams0.setQuery(query1);

      int page1 = 4;

      searchDictionaryEntriesParams0.setPage(page1);

      int hitsPerPage1 = 2;

      searchDictionaryEntriesParams0.setHitsPerPage(hitsPerPage1);
      String language1 = "fr";

      searchDictionaryEntriesParams0.setLanguage(language1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchDictionaryEntries(
          dictionaryName0,
          searchDictionaryEntriesParams0
        );
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/compounds/search");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"foo\",\"page\":4,\"hitsPerPage\":2,\"language\":\"fr\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get searchForFacetValues results with minimal parameters")
  void searchForFacetValuesTest0() {
    String indexName0 = "indexName";

    String facetName0 = "facetName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchForFacetValues(indexName0, facetName0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/facets/facetName/query");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("get searchForFacetValues results with all parameters")
  void searchForFacetValuesTest1() {
    String indexName0 = "indexName";

    String facetName0 = "facetName";

    SearchForFacetValuesRequest searchForFacetValuesRequest0 = new SearchForFacetValuesRequest();
    {
      String params1 = "query=foo&facetFilters=['bar']";

      searchForFacetValuesRequest0.setParams(params1);
      String facetQuery1 = "foo";

      searchForFacetValuesRequest0.setFacetQuery(facetQuery1);

      int maxFacetHits1 = 42;

      searchForFacetValuesRequest0.setMaxFacetHits(maxFacetHits1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchForFacetValues(
          indexName0,
          facetName0,
          searchForFacetValuesRequest0
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/facets/facetName/query");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"params\":\"query=foo&facetFilters=['bar']\",\"facetQuery\":\"foo\",\"maxFacetHits\":42}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("searchRules")
  void searchRulesTest0() {
    String indexName0 = "indexName";

    SearchRulesParams searchRulesParams0 = new SearchRulesParams();
    {
      String query1 = "something";

      searchRulesParams0.setQuery(query1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchRules(indexName0, searchRulesParams0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/rules/search");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"something\"}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("searchSynonyms")
  void searchSynonymsTest0() {
    String indexName0 = "indexName";

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchSynonyms(indexName0);
      }
    );

    assertEquals(req.getPath(), "/1/indexes/indexName/synonyms/search");
    assertEquals(req.getMethod(), "POST");
  }

  @Test
  @DisplayName("searchUserIds")
  void searchUserIdsTest0() {
    SearchUserIdsParams searchUserIdsParams0 = new SearchUserIdsParams();
    {
      String query1 = "test";

      searchUserIdsParams0.setQuery(query1);
      String clusterName1 = "theClusterName";

      searchUserIdsParams0.setClusterName(clusterName1);

      int page1 = 5;

      searchUserIdsParams0.setPage(page1);

      int hitsPerPage1 = 10;

      searchUserIdsParams0.setHitsPerPage(hitsPerPage1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.searchUserIds(searchUserIdsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/clusters/mapping/search");
    assertEquals(req.getMethod(), "POST");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"query\":\"test\",\"clusterName\":\"theClusterName\",\"page\":5,\"hitsPerPage\":10}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get setDictionarySettings results with minimal parameters")
  void setDictionarySettingsTest0() {
    DictionarySettingsParams dictionarySettingsParams0 = new DictionarySettingsParams();
    {
      StandardEntries disableStandardEntries1 = new StandardEntries();
      {
        HashMap plurals2 = new HashMap<String, Object>();
        {
          boolean fr3 = false;

          plurals2.put("fr", fr3);

          boolean en3 = false;

          plurals2.put("en", en3);

          boolean ru3 = true;

          plurals2.put("ru", ru3);
        }
        disableStandardEntries1.setPlurals(plurals2);
      }
      dictionarySettingsParams0.setDisableStandardEntries(
        disableStandardEntries1
      );
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.setDictionarySettings(dictionarySettingsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/*/settings");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"disableStandardEntries\":{\"plurals\":{\"fr\":false,\"en\":false,\"ru\":true}}}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("get setDictionarySettings results with all parameters")
  void setDictionarySettingsTest1() {
    DictionarySettingsParams dictionarySettingsParams0 = new DictionarySettingsParams();
    {
      StandardEntries disableStandardEntries1 = new StandardEntries();
      {
        HashMap plurals2 = new HashMap<String, Object>();
        {
          boolean fr3 = false;

          plurals2.put("fr", fr3);

          boolean en3 = false;

          plurals2.put("en", en3);

          boolean ru3 = true;

          plurals2.put("ru", ru3);
        }
        disableStandardEntries1.setPlurals(plurals2);

        HashMap stopwords2 = new HashMap<String, Object>();
        {
          boolean fr3 = false;

          stopwords2.put("fr", fr3);
        }
        disableStandardEntries1.setStopwords(stopwords2);

        HashMap compounds2 = new HashMap<String, Object>();
        {
          boolean ru3 = true;

          compounds2.put("ru", ru3);
        }
        disableStandardEntries1.setCompounds(compounds2);
      }
      dictionarySettingsParams0.setDisableStandardEntries(
        disableStandardEntries1
      );
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.setDictionarySettings(dictionarySettingsParams0);
      }
    );

    assertEquals(req.getPath(), "/1/dictionaries/*/settings");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"disableStandardEntries\":{\"plurals\":{\"fr\":false,\"en\":false,\"ru\":true},\"stopwords\":{\"fr\":false},\"compounds\":{\"ru\":true}}}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }

  @Test
  @DisplayName("setSettings")
  void setSettingsTest0() {
    String indexName0 = "theIndexName";

    IndexSettings indexSettings0 = new IndexSettings();
    {
      int paginationLimitedTo1 = 10;

      indexSettings0.setPaginationLimitedTo(paginationLimitedTo1);
    }

    boolean forwardToReplicas0 = true;

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.setSettings(
          indexName0,
          indexSettings0,
          forwardToReplicas0
        );
      }
    );

    assertEquals(req.getPath(), "/1/indexes/theIndexName/settings");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"paginationLimitedTo\":10}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });

    HashMap<String, String> expectedQuery = JSON.deserialize(
      "{\"forwardToReplicas\":\"true\"}",
      new TypeToken<HashMap<String, String>>() {}.getType()
    );
    List<Pair> acutalQuery = req.getQueryParams();
    for (Pair p : acutalQuery) {
      assertEquals(expectedQuery.get(p.getName()), p.getValue());
    }
  }

  @Test
  @DisplayName("updateApiKey")
  void updateApiKeyTest0() {
    String key0 = "myApiKey";

    ApiKey apiKey0 = new ApiKey();
    {
      List acl1 = new ArrayList();
      {
        Acl acl_02 = Acl.fromValue("search");

        acl1.add(acl_02);

        Acl acl_12 = Acl.fromValue("addObject");

        acl1.add(acl_12);
      }

      apiKey0.setAcl(acl1);

      int validity1 = 300;

      apiKey0.setValidity(validity1);

      int maxQueriesPerIPPerHour1 = 100;

      apiKey0.setMaxQueriesPerIPPerHour(maxQueriesPerIPPerHour1);

      int maxHitsPerQuery1 = 20;

      apiKey0.setMaxHitsPerQuery(maxHitsPerQuery1);
    }

    EchoResponseInterface req = (EchoResponseInterface) assertDoesNotThrow(() -> {
        return client.updateApiKey(key0, apiKey0);
      }
    );

    assertEquals(req.getPath(), "/1/keys/myApiKey");
    assertEquals(req.getMethod(), "PUT");

    assertDoesNotThrow(() -> {
      JSONAssert.assertEquals(
        "{\"acl\":[\"search\",\"addObject\"],\"validity\":300,\"maxQueriesPerIPPerHour\":100,\"maxHitsPerQuery\":20}",
        req.getBody(),
        JSONCompareMode.STRICT_ORDER
      );
    });
  }
}
