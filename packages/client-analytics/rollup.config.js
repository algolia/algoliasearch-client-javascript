import { buildConfigs } from '../../base.rollup.config.js';

import pkg from './package.json' with { type: 'json' };

export default buildConfigs(pkg);