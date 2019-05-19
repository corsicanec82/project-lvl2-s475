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
  [`${pathToData}before.json`, `${pathToData}after.json`, 'tree', fs.readFileSync(`${pathToData}json-tree.result`, 'utf8')],
  [`${pathToData}before.yml`, `${pathToData}after.yml`, 'tree', fs.readFileSync(`${pathToData}json-tree.result`, 'utf8')],
  [`${pathToData}before.ini`, `${pathToData}after.ini`, 'tree', fs.readFileSync(`${pathToData}ini-tree.result`, 'utf8')],
  [`${pathToData}before.json`, `${pathToData}after.json`, 'plain', fs.readFileSync(`${pathToData}json-plain.result`, 'utf8')],
  [`${pathToData}before.yml`, `${pathToData}after.yml`, 'plain', fs.readFileSync(`${pathToData}json-plain.result`, 'utf8')],
  [`${pathToData}before.ini`, `${pathToData}after.ini`, 'plain', fs.readFileSync(`${pathToData}ini-plain.result`, 'utf8')],
  [`${pathToData}before.json`, `${pathToData}after.json`, 'json', fs.readFileSync(`${pathToData}json-json.result`, 'utf8')],
  [`${pathToData}before.yml`, `${pathToData}after.yml`, 'json', fs.readFileSync(`${pathToData}json-json.result`, 'utf8')],
  [`${pathToData}before.ini`, `${pathToData}after.ini`, 'json', fs.readFileSync(`${pathToData}ini-json.result`, 'utf8')],
];

test.each(dataTree)('test format \'tree\' %#', (firstPathToFile, secondPathToFile, format, expected) => {
  expect(genDiff(firstPathToFile, secondPathToFile, format)).toBe(expected);
});
