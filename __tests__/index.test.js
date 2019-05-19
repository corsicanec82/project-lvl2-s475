import fs from 'fs';
import genDiff from '../src';

const pathToData = '__tests__/__fixtures__/';

const pathError = [
  ['__tests__', `${pathToData}after.json`, 'Error: EISDIR: illegal operation on a directory, read'],
  ['wrong path', `${pathToData}after.json`, 'Error: ENOENT: no such file or directory, open \'wrong path\''],
  [`${pathToData}before-error.json`, `${pathToData}after.json`, 'SyntaxError: Unexpected token w in JSON at position 1'],
  [`${pathToData}before-error.yml`, `${pathToData}after.json`, 'YAMLException: end of the stream or a document separator is expected at line 2, column 5:\n    host: hexlet.io\n        ^'],
];

test.each(pathError)('test error %#', (firstPathToFile, secondPathToFile, expected) => {
  expect(genDiff(firstPathToFile, secondPathToFile)).toBe(expected);
});

const dataTree = [
  ['before.json', 'after.json', 'tree', 'json-tree.result'],
  ['before.yml', 'after.yml', 'tree', 'json-tree.result'],
  ['before.ini', 'after.ini', 'tree', 'ini-tree.result'],
  ['before.json', 'after.json', 'plain', 'json-plain.result'],
  ['before.yml', 'after.yml', 'plain', 'json-plain.result'],
  ['before.ini', 'after.ini', 'plain', 'ini-plain.result'],
  ['before.json', 'after.json', 'json', 'json-json.result'],
  ['before.yml', 'after.yml', 'json', 'json-json.result'],
  ['before.ini', 'after.ini', 'json', 'ini-json.result'],
];

test.each(dataTree)('test format \'tree\' %#', (file1, file2, format, expectedFile) => {
  const firstPathToFile = `${pathToData}${file1}`;
  const secondPathToFile = `${pathToData}${file2}`;
  const expected = fs.readFileSync(`${pathToData}${expectedFile}`, 'utf8');
  expect(genDiff(firstPathToFile, secondPathToFile, format)).toBe(expected);
});
