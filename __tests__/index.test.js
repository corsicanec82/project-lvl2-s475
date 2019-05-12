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
  console.error = jest.fn();
  genDiff(firstPathToFile, secondPathToFile);
  expect(console.error).toHaveBeenCalledWith(expected);
});

const pathCorrect = [
  [`${pathToData}before.json`, `${pathToData}after.json`, fs.readFileSync(`${pathToData}json.result`, 'utf8')],
  [`${pathToData}before.yml`, `${pathToData}after.yml`, fs.readFileSync(`${pathToData}yaml.result`, 'utf8')],
  [`${pathToData}before.ini`, `${pathToData}after.ini`, fs.readFileSync(`${pathToData}ini.result`, 'utf8')],
];

test.each(pathCorrect)('test format %#', (firstPathToFile, secondPathToFile, expected) => {
  console.log = jest.fn();
  genDiff(firstPathToFile, secondPathToFile);
  expect(console.log).toHaveBeenCalledWith(expected);
});
