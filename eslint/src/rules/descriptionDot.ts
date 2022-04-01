/* eslint-disable no-console */
import type { Rule } from 'eslint';

import { isBLockScalar, isPairWithKey, isScalar } from '../utils';

export const descriptionDot: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'description must end with a dot',
    },
    messages: {
      descriptionNoDot: 'description does not end with a dot',
    },
    fixable: 'code',
  },
  create(context) {
    if (!context.parserServices.isYAML) {
      return {};
    }

    return {
      YAMLPair(node): void {
        if (!isPairWithKey(node, 'description')) {
          return;
        }
        if (!isScalar(node.value)) {
          return;
        }
        const value = node.value;
        if (
          typeof value.value !== 'string' ||
          value.value.trim().endsWith('.') ||
          !value.value.trim().includes(' ')
        ) {
          // The rule is respected if:
          // the description is not a string
          // or it ends with a dot
          // or it's a single word (like 'OK' or 'Success', it's not a sentence)
          return;
        }

        // trim the whitespaces at the end before adding the dot. This assume the indent is 2
        let toTrim = value.value.length - value.value.trimEnd().length;
        if (isBLockScalar(value)) {
          toTrim += node.key!.loc.start.column + 2;
        }
        context.report({
          node: node as any,
          messageId: 'descriptionNoDot',
          fix(fixer) {
            return fixer.insertTextAfterRange(
              [0, value.range[1] - toTrim],
              '.'
            );
          },
        });
      },
    };
  },
};
