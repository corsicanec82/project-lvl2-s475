#!/usr/bin/env node

import programm from 'commander';
import genDiff from '..';

programm
  .version('2.0.2', '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'tree')
  .arguments('<firstConfig> <secondConfig>');

programm.action((firstConfig, secondConfig) => {
  const diff = genDiff(firstConfig, secondConfig, programm.format);
  console.log(diff);
});

programm.parse(process.argv);
