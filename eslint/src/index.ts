import { descriptionDot } from './rules/descriptionDot';
import { outOfLineEnum } from './rules/outOfLineEnum';
import { singleQuoteRef } from './rules/singleQuoteRef';

const rules = {
  'description-dot': descriptionDot,
  'out-of-line-enum': outOfLineEnum,
  'single-quote-ref': singleQuoteRef,
};

export { rules };
