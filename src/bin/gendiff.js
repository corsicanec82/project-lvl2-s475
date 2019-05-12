#!/usr/bin/env node

import programm from 'commander';
import genDiff from '..';

programm
  .version('1.4.2', '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>');

programm.action((firstConfig, secondConfig) => {
  genDiff(firstConfig, secondConfig);
});

programm.parse(process.argv);
