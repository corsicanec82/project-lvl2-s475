import { compare } from '../src';
import { readFile, parse } from '../src/parsers';

const pathToData = '__tests__/__fixtures__/';

test('read file', () => {
  const json = {
    content: [
      '{\n',
      '  "host": "hexlet.io",\n',
      '  "timeout": 50,\n',
      '  "proxy": "123.234.53.22",\n',
      '  "follow": false\n',
      '}\n',
    ].join(''),
    format: 'json',
  };

  expect(() => readFile('__tests__')).toThrow('illegal operation on a directory');
  expect(() => readFile('wrong path')).toThrow('no such file or directory');
  expect(readFile(`${pathToData}before.json`)).toEqual(json);
});

test('parse data to obj', () => {
  const obj = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(parse(readFile(`${pathToData}before.json`))).toEqual(obj);
  expect(() => parse('wrong format')).toThrow('is not a function');
  expect(() => parse(readFile(`${pathToData}before-error.json`))).toThrow('Unexpected token');
});

test('compare two objects', () => {
  const expected = [
    '  host: hexlet.io',
    '- timeout: 50',
    '+ timeout: 20',
    '- proxy: 123.234.53.22',
    '- follow: false',
    '+ verbose: true',
  ].join('\n');

  const obj1 = parse(readFile(`${pathToData}before.json`));
  const obj2 = parse(readFile(`${pathToData}after.yml`));
  expect(compare(obj1, obj2)).toBe(expected);
});

// test('default', () => {
//   genDiff(`${pathToData}before.json`, `${pathToData}after.yml`);
//   console.log = jest.fn();
//   genDiff(`${pathToData}before.json`, `${pathToData}after.yml`);
//   expect(console.log).toBe('xzxz');
// });

// test('Tests my console.log', () => {
//   console.log = jest.fn();
//   console.log('My test is working with console.log');
//   expect(console.log).toHaveBeenCalledWith('My test is working with console.log1');
// });
