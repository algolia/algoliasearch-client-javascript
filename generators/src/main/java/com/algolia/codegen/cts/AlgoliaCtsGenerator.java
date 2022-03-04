package com.algolia.codegen.cts;

import org.openapitools.codegen.*;

import java.util.*;
import java.util.Map.Entry;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.google.common.collect.ImmutableMap.Builder;
import com.samskivert.mustache.Mustache.Lambda;

import java.io.File;
import java.io.IOException;

import io.swagger.v3.core.util.Json;

@SuppressWarnings("unchecked")
public class AlgoliaCtsGenerator extends DefaultCodegen {
  // cache the models
  private final Map<String, CodegenModel> models = new HashMap<>();

  /**
   * Configures the type of generator.
   *
   * @return the CodegenType for this generator
   * @see org.openapitools.codegen.CodegenType
   */
  @Override
  public CodegenType getTag() {
    return CodegenType.OTHER;
  }

  /**
   * Configures a friendly name for the generator. This will be used by the
   * generator
   * to select the library with the -g flag.
   *
   * @return the friendly name for the generator
   */
  @Override
  public String getName() {
    return "algolia-cts";
  }

  /**
   * Returns human-friendly help for the generator. Provide the consumer with help
   * tips, parameters here
   *
   * @return A string value for the help message
   */
  public String getHelp() {
    return "Generates the CTS";
  }

  @Override
  public Map<String, Object> postProcessAllModels(Map<String, Object> objs) {
    Map<String, Object> mod = super.postProcessAllModels(objs);
    for (Entry<String, Object> entry : mod.entrySet()) {
      List<Object> innerModel = ((Map<String, List<Object>>) entry.getValue()).get("models");
      if (!innerModel.isEmpty()) {
        models.put(entry.getKey(), (CodegenModel) ((Map<String, Object>) innerModel.get(0)).get("model"));
      }
    }
    return mod;
  }

  public AlgoliaCtsGenerator() {
    super();
    supportingFiles
        .add(new SupportingFile("requests.mustache", "src/test/java/com/algolia/methods/requests", "search.test.java"));
  }

  @Override
  protected Builder<String, Lambda> addMustacheLambdas() {
    Builder<String, Lambda> lambdas = super.addMustacheLambdas();

    lambdas.put("escapequotes", new EscapeQuotesLambda());
    return lambdas;
  }

  @Override
  public Map<String, Object> postProcessSupportingFileData(Map<String, Object> objs) {
    Map<String, Request[]> cts = null;
    try {
      cts = loadCTS();

      Map<String, CodegenOperation> operations = buildOperations(objs).get("Search");

      Map<String, Object> bundle = super.postProcessSupportingFileData(objs);

      // We can put whatever we want in the bundle, and it will be accessible in the
      // template
      bundle.put("client", "SearchApi");

      List<Object> blocks = new ArrayList<>();
      ParametersWithDataType paramsType = new ParametersWithDataType(models);

      for (Entry<String, Request[]> entry : cts.entrySet()) {
        if (!operations.containsKey(entry.getKey())) {
          throw new CTSException("operationId " + entry.getKey() + " does not exist in the spec");
        }
        CodegenOperation op = operations.get(entry.getKey());

        List<Object> tests = new ArrayList<>();
        for (int i = 0; i < entry.getValue().length; i++) {
          Map<String, Object> test = paramsType.buildJSONForRequest(entry.getValue()[i], op, i);
          tests.add(test);
        }
        Map<String, Object> testObj = new HashMap<>();
        testObj.put("tests", tests);
        blocks.add(testObj);
      }
      bundle.put("blocks", blocks);

      return bundle;
    } catch (Exception e) {
      e.printStackTrace();
      System.exit(1);
    }
    return null;
  }

  private Map<String, Request[]> loadCTS() throws JsonParseException, JsonMappingException, IOException {
    TreeMap<String, Request[]> cts = new TreeMap<>();
    File dir = new File("tests/CTS/methods/requests/search");
    for (File f : dir.listFiles()) {
      cts.put(f.getName().replace(".json", ""), Json.mapper().readValue(f, Request[].class));
    }
    return cts;
  }

  // Client -> operationId -> CodegenOperation
  private HashMap<String, HashMap<String, CodegenOperation>> buildOperations(Map<String, Object> objs) {
    HashMap<String, HashMap<String, CodegenOperation>> result = new HashMap<>();
    List<Map<String, Object>> apis = ((Map<String, List<Map<String, Object>>>) objs.get("apiInfo")).get("apis");
    for (Map<String, Object> api : apis) {
      String apiName = (String) api.get("baseName");
      List<CodegenOperation> operations = ((Map<String, List<CodegenOperation>>) api.get("operations"))
          .get("operation");

      HashMap<String, CodegenOperation> allOp = new HashMap<>();
      for (CodegenOperation ope : operations) {
        allOp.put(ope.operationId, ope);
      }
      result.put(apiName, allOp);
    }
    return result;
  }

  /**
   * override with any special text escaping logic to handle unsafe
   * characters so as to avoid code injection
   *
   * @param input String to be cleaned up
   * @return string with unsafe characters removed or escaped
   */
  @Override
  public String escapeUnsafeCharacters(String input) {
    return input;
  }

  /**
   * Escape single and/or double quote to avoid code injection
   *
   * @param input String to be cleaned up
   * @return string with quotation mark removed or escaped
   */
  public String escapeQuotationMark(String input) {
    return input.replace("\"", "\\\"");
  }
}
