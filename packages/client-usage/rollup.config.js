import { buildConfigs } from '../../base.rollup.config.js';

import pkg from './package.json' assert { type: 'json' };

export default buildConfigs(pkg);