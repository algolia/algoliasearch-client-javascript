import type { AST } from 'yaml-eslint-parser';

export function isScalar(node: AST.YAMLNode | null): node is AST.YAMLScalar {
  return node !== null && node.type === 'YAMLScalar';
}

export function isBLockScalar(
  node: AST.YAMLNode | null
): node is AST.YAMLBlockFoldedScalar | AST.YAMLBlockLiteralScalar {
  return isScalar(node) && 'chomping' in node;
}

export function isPairWithKey(
  node: AST.YAMLNode | null,
  key: string
): node is AST.YAMLPair {
  if (node === null || node.type !== 'YAMLPair' || node.key === null)
    return false;
  return isScalar(node.key) && node.key.value === key;
}
