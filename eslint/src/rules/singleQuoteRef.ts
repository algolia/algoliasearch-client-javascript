import type { Rule } from 'eslint';

import { isBLockScalar, isPairWithKey, isScalar } from '../utils';

export const singleQuoteRef: Rule.RuleModule = {
  meta: {
    docs: {
      description: '$ref must be wrapped in single quote',
    },
    messages: {
      refNoQuote: '$ref is not wrapped in single quote',
    },
    fixable: 'code',
  },
  create(context) {
    if (!context.parserServices.isYAML) {
      return {};
    }

    return {
      YAMLPair(node): void {
        if (!isPairWithKey(node, '$ref')) {
          return;
        }
        if (!isScalar(node.value)) {
          // not our problem, something else will fail like path resolution
          return;
        }
        if (node.value.style === 'single-quoted') {
          // that's what we want
          return;
        }
        if (isBLockScalar(node.value)) {
          // another rule should take care of that case
          return;
        }
        const hasDoubleQuote = node.value.style === 'double-quoted';
        const [start, end] = node.value.range;
        context.report({
          node: node as any,
          messageId: 'refNoQuote',
          *fix(fixer) {
            if (hasDoubleQuote) {
              yield fixer.replaceTextRange([start, start + 1], "'");
              yield fixer.replaceTextRange([end - 1, end], "'");
            } else {
              yield fixer.insertTextBeforeRange([start, start], "'");
              yield fixer.insertTextAfterRange([end, end], "'");
            }
          },
        });
      },
    };
  },
};
