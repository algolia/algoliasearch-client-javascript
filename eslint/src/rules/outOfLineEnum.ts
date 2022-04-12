import type { Rule } from 'eslint';

import { isPairWithKey } from '../utils';

export const outOfLineEnum: Rule.RuleModule = {
  meta: {
    docs: {
      description: 'enum must be out of line',
    },
    messages: {
      enumNotOutOfLine: 'enum is not out of line',
    },
  },
  create(context) {
    if (!context.parserServices.isYAML) {
      return {};
    }

    return {
      YAMLPair(node): void {
        if (!isPairWithKey(node, 'enum')) {
          return;
        }
        // parent is mapping, and parent is real parent that must be to the far left
        if (node.parent.parent.loc.start.column === 0) {
          return;
        }
        if (
          isPairWithKey(
            node.parent.parent.parent.parent?.parent?.parent?.parent ?? null,
            'servers'
          )
        ) {
          // accept out of line enum if in servers
          return;
        }
        context.report({
          node: node.parent.parent as any,
          messageId: 'enumNotOutOfLine',
        });
      },
    };
  },
};
