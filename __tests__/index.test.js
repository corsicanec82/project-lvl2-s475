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

const expected = [
  '  host: hexlet.io',
  '- timeout: 50',
  '+ timeout: 20',
  '- proxy: 123.234.53.22',
  '- follow: false',
  '+ verbose: true',
].join('\n');

const pathCorrect = [
  [`${pathToData}before.json`, `${pathToData}after.json`],
  [`${pathToData}before.yml`, `${pathToData}after.yml`],
  [`${pathToData}before.ini`, `${pathToData}after.ini`],
];

test.each(pathCorrect)('test format %#', (firstPathToFile, secondPathToFile) => {
  console.log = jest.fn();
  genDiff(firstPathToFile, secondPathToFile);
  expect(console.log).toHaveBeenCalledWith(expected);
});
