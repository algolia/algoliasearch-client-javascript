package com.algolia.codegen;

import java.util.List;

import org.openapitools.codegen.CodegenOperation;
import org.openapitools.codegen.languages.TypeScriptNodeClientCodegen;
import io.swagger.v3.oas.models.media.Schema;
import io.swagger.v3.oas.models.parameters.Parameter;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.servers.Server;

public class AlgoliaJavascriptGenerator extends TypeScriptNodeClientCodegen {
  @Override
  public String getName() {
    return "algolia-javascript";
  }

  @Override
  public CodegenOperation fromOperation(String path, String httpMethod, Operation operation, List<Server> servers) {
    return Utils.specifyCustomRequest(super.fromOperation(path, httpMethod, operation, servers));
  }

  @Override
  protected String getParameterDataType(Parameter parameter, Schema p) {
    String type = super.getParameterDataType(parameter, p);
    // openapi generator is wrong, 'object' is not a fit all object, we need 'any'
    // we use replace because there might be more to this type, like '| undefined'
    return type.replace("{ [key: string]: object; }", "Record<string, any>");
  }
}
