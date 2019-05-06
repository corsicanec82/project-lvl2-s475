#!/usr/bin/env node

import programm from 'commander';

programm
  .version('1.0.1', '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .parse(process.argv);
