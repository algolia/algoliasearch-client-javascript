package com.algolia.codegen.cts;

import java.util.*;
import java.util.Map.Entry;

import com.algolia.codegen.Utils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;

import org.openapitools.codegen.CodegenModel;
import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.CodegenParameter;
import org.openapitools.codegen.CodegenProperty;
import org.openapitools.codegen.CodegenResponse;
import org.openapitools.codegen.IJsonSchemaValidationProperties;

import io.swagger.util.Json;

@SuppressWarnings("unchecked")
public class ParametersWithDataType {
  private final Map<String, CodegenModel> models;

  public ParametersWithDataType(Map<String, CodegenModel> models) {
    this.models = models;
  }

  public Map<String, Object> buildJSONForRequest(Request req, CodegenOperation ope, int testIndex)
      throws CTSException, JsonMappingException, JsonProcessingException {
    Map<String, Object> test = new HashMap<>();
    test.put("method", req.method);
    test.put("testName", req.testName == null ? req.method : req.testName);
    test.put("testIndex", testIndex);
    test.put("request", req.request);

    test.put("hasParameters", req.parameters.size() != 0);

    if (req.parameters.size() == 0) {
      return test;
    }
    // Give the stringified version to mustache
    test.put("parameters", Json.mapper().writeValueAsString(req.parameters));

    List<Object> parametersWithDataType = new ArrayList<>();

    // special case if there is only bodyParam which is not an array
    if (ope.allParams.size() == 1 && ope.bodyParams.size() == 1 && !ope.bodyParam.isArray) {
      parametersWithDataType.add(traverseParams(ope.bodyParam.paramName, req.parameters, ope.bodyParam, "", 0));
    } else {
      for (Entry<String, Object> param : req.parameters.entrySet()) {
        CodegenParameter specParam = null;
        for (CodegenParameter sp : ope.allParams) {
          if (sp.paramName.equals(param.getKey())) {
            specParam = sp;
            break;
          }
        }
        if (specParam == null) {
          throw new CTSException("Parameter " + param.getKey() + " not found in the root parameter");
        }
        parametersWithDataType.add(traverseParams(param.getKey(), param.getValue(), specParam, "", 0));
      }
    }

    test.put("parametersWithDataType", parametersWithDataType);
    return test;
  }

  private Map<String, Object> traverseParams(String paramName, Object param, IJsonSchemaValidationProperties spec,
      String parent, int suffix)
      throws CTSException {
    String baseType = getTypeName(spec);
    if (baseType == null) {
      throw new CTSException("Cannot determine type of " + paramName + " (value: " + param + ")");
    }

    boolean isCodegenModel = spec instanceof CodegenModel;

    if (!isCodegenModel) {
      // don't overwrite it if it's already a model
      // sometimes it's in lowercase for some reason
      String lowerBaseType = baseType.substring(0, 1).toLowerCase() + baseType.substring(1);
      if (models.containsKey(baseType)) {
        // get the real model if possible
        spec = models.get(baseType);
      } else if (models.containsKey(lowerBaseType)) {
        spec = models.get(lowerBaseType);
      }
      isCodegenModel = spec instanceof CodegenModel;
    }

    String finalParamName = paramName;
    if (paramName.startsWith("_")) {
      finalParamName = paramName.substring(1);
    }

    Map<String, Object> testOutput = createDefaultOutput();
    testOutput.put("key", finalParamName);
    testOutput.put("parentSuffix", suffix - 1);
    testOutput.put("suffix", suffix);
    testOutput.put("parent", parent);
    testOutput.put("objectName", Utils.capitalize(baseType));

    if (spec.getIsArray()) {
      handleArray(paramName, param, testOutput, spec, suffix);
    } else if (isEnum(spec)) {
      handleEnum(param, testOutput);
    } else if (spec.getIsModel() || isCodegenModel) {
      // recursive object
      handleModel(paramName, param, testOutput, spec, baseType, parent, suffix);
    } else if (baseType.equals("Object")) {
      // not var, no item, pure free form
      handleObject(paramName, param, testOutput, spec, suffix);
    } else if (spec.getIsMap()) {
      // free key but only one type
      handleMap(paramName, param, testOutput, spec, suffix);
    } else {
      handlePrimitive(param, testOutput);
    }
    return testOutput;
  }

  private Map<String, Object> createDefaultOutput() {
    Map<String, Object> testOutput = new HashMap<>();

    // we need to set all types to false otherwise mustache will read the one from
    // the parent context and run into a infinite loop
    testOutput.put("isObject", false);
    testOutput.put("isArray", false);
    testOutput.put("isFreeFormObject", false);
    testOutput.put("isString", false);
    testOutput.put("isInteger", false);
    testOutput.put("isDouble", false);
    testOutput.put("isBoolean", false);
    testOutput.put("isEnum", false);

    return testOutput;
  }

  private void handleArray(String paramName, Object param, Map<String, Object> testOutput,
      IJsonSchemaValidationProperties spec, int suffix) throws CTSException {
    List<Object> items = (List<Object>) param;

    List<Object> values = new ArrayList<>();
    for (int i = 0; i < items.size(); i++) {
      values.add(traverseParams(paramName + "_" + i, items.get(i), spec.getItems(), paramName, suffix + 1));
    }

    testOutput.put("isArray", true);
    testOutput.put("value", values);
  }

  private void handleEnum(Object param, Map<String, Object> testOutput) {
    testOutput.put("isEnum", true);
    testOutput.put("value", param);
  }

  private void handleModel(String paramName, Object param, Map<String, Object> testOutput,
      IJsonSchemaValidationProperties spec, String baseType, String parent, int suffix) throws CTSException {
    assert (spec.getHasVars());
    assert (spec.getItems() == null);

    if (spec instanceof CodegenModel && ((CodegenModel) spec).oneOf.size() > 0) {
      // find a discriminator to handle oneOf
      CodegenModel model = (CodegenModel) spec;
      IJsonSchemaValidationProperties match = findMatchingOneOf(param, model);
      testOutput.clear();
      testOutput.putAll(traverseParams(paramName, param, match, parent, suffix));
      testOutput.put("oneOfModel", baseType);
      return;
    }

    Map<String, Object> vars = (Map<String, Object>) param;
    List<Object> values = new ArrayList<>();
    for (Entry<String, Object> entry : vars.entrySet()) {
      IJsonSchemaValidationProperties varSpec = null;
      for (CodegenProperty vs : spec.getVars()) {
        if (vs.baseName.equals(entry.getKey())) {
          varSpec = vs;
          break;
        }
      }
      if (varSpec == null) {
        throw new CTSException("Parameter " + entry.getKey() + " not found in " + paramName
            + ". You might have a type conflict in the spec for " + baseType);
      }

      values.add(traverseParams(entry.getKey(), entry.getValue(), varSpec, paramName, suffix + 1));
    }
    testOutput.put("isObject", true);
    testOutput.put("value", values);
  }

  private void handleObject(String paramName, Object param, Map<String, Object> testOutput,
      IJsonSchemaValidationProperties spec, int suffix) throws CTSException {
    assert (!spec.getHasVars());
    assert (spec.getItems() == null);

    Map<String, Object> vars = (Map<String, Object>) param;

    List<Object> values = new ArrayList<>();
    for (Entry<String, Object> entry : vars.entrySet()) {
      CodegenParameter objSpec = new CodegenParameter();
      objSpec.dataType = inferDataType(entry.getValue(), objSpec, null);
      values.add(traverseParams(entry.getKey(), entry.getValue(), objSpec, paramName, suffix + 1));
    }

    testOutput.put("isFreeFormObject", true);
    testOutput.put("value", values);
  }

  private void handleMap(String paramName, Object param, Map<String, Object> testOutput,
      IJsonSchemaValidationProperties spec, int suffix) throws CTSException {
    assert (!spec.getHasVars());
    assert (spec.getItems() != null);

    Map<String, Object> vars = (Map<String, Object>) param;

    List<Object> values = new ArrayList<>();
    for (Entry<String, Object> entry : vars.entrySet()) {
      values.add(traverseParams(entry.getKey(), entry.getValue(), spec.getItems(), paramName, suffix + 1));
    }

    testOutput.put("isFreeFormObject", true);
    testOutput.put("value", values);
  }

  private void handlePrimitive(Object param, Map<String, Object> testOutput) throws CTSException {
    inferDataType(param, null, testOutput);
    testOutput.put("value", param);
  }

  private String getTypeName(IJsonSchemaValidationProperties param) {
    if (param instanceof CodegenParameter) {
      return ((CodegenParameter) param).dataType;
    }
    if (param instanceof CodegenProperty) {
      return ((CodegenProperty) param).dataType;
    }
    if (param instanceof CodegenModel) {
      return ((CodegenModel) param).classname;
    }
    if (param instanceof CodegenResponse) {
      return ((CodegenResponse) param).dataType;
    }
    return null;
  }

  private boolean isEnum(IJsonSchemaValidationProperties param) {
    if (param instanceof CodegenParameter) {
      return ((CodegenParameter) param).isEnum;
    }
    if (param instanceof CodegenProperty) {
      return ((CodegenProperty) param).isEnum;
    }
    if (param instanceof CodegenModel) {
      return ((CodegenModel) param).isEnum;
    }
    return false;
  }

  private String inferDataType(Object param, CodegenParameter spec, Map<String, Object> output) throws CTSException {
    switch (param.getClass().getSimpleName()) {
      case "String":
        if (spec != null)
          spec.setIsString(true);
        if (output != null)
          output.put("isString", true);
        return "String";
      case "Integer":
        if (spec != null)
          spec.setIsNumber(true);
        if (output != null)
          output.put("isInteger", true);
        return "Integer";
      case "Long":
        if (spec != null)
          spec.setIsNumber(true);
        if (output != null)
          output.put("isInteger", true);
        return "Long";
      case "Double":
        if (spec != null)
          spec.setIsNumber(true);
        if (output != null)
          output.put("isDouble", true);
        return "Double";
      case "Boolean":
        if (spec != null)
          spec.setIsBoolean(true);
        if (output != null)
          output.put("isBoolean", true);
        return "Boolean";
      default:
        throw new CTSException("Unknown type: " + param.getClass().getSimpleName());
    }
  }

  private IJsonSchemaValidationProperties findMatchingOneOf(Object param, CodegenModel model) throws CTSException {
    if (param instanceof Map) {
      // for object, check which has the most of property in common
      int maxCount = 0;
      CodegenModel bestOneOf = model.interfaceModels.get(0);
      for (CodegenModel oneOf : model.interfaceModels) {
        if (oneOf.vars.size() == 0) {
          continue;
        }

        Map<String, Object> map = (Map<String, Object>) param;
        int commonCount = 0;
        for (String prop : map.keySet()) {
          for (CodegenProperty propOneOf : oneOf.vars) {
            if (prop.equals(propOneOf.name)) {
              commonCount++;
            }
          }
        }
        if (commonCount > maxCount) {
          maxCount = commonCount;
          bestOneOf = oneOf;
        }
      }
      return bestOneOf;
    }
    if (param instanceof List) {
      // no idea for list
      return null;
    }

    CodegenParameter maybeMatch = new CodegenParameter();
    String paramType = inferDataType(param, maybeMatch, null);
    maybeMatch.dataType = paramType;

    for (String oneOfName : model.oneOf) {
      if (oneOfName.equals(paramType)) {
        return maybeMatch;
      }
    }
    for (CodegenModel oneOf : model.interfaceModels) {
      if (oneOf.dataType.equals(paramType))
        return oneOf;
    }
    return null;
  }
}
