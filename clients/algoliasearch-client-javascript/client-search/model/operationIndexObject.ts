export type OperationIndexObject = {
  /**
   * Type of operation to perform (move or copy).
   */
  operation: OperationIndexObject.OperationEnum;
  /**
   * The Algolia index name.
   */
  destination: string;
  /**
   * Scope of the data to copy. When absent, a full copy is performed. When present, only the selected scopes are copied.
   */
  scope?: OperationIndexObject.ScopeEnum[];
};

export namespace OperationIndexObject {
  export enum OperationEnum {
    Move = 'move',
    Copy = 'copy',
  }
  export enum ScopeEnum {
    Settings = 'settings',
    Synonyms = 'synonyms',
    Rules = 'rules',
  }
}
