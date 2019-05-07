import * as GenDiff from '../src';

test('read file to string', () => {
  const json = [
    '{\n',
    '  "host": "hexlet.io",\n',
    '  "timeout": 50,\n',
    '  "proxy": "123.234.53.22",\n',
    '  "follow": false\n',
    '}\n',
  ].join('');

  expect(GenDiff.readFile('__fixtures__')).toBe(null);
  expect(GenDiff.readFile('__tests__/__fixtures__/before.json')).toBe(json);
});

test('convert JSON string to Object', () => {
  const obj = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  expect(GenDiff.jsonToObj(GenDiff.readFile('__tests__/__fixtures__/before.json'))).toEqual(obj);
  expect(GenDiff.jsonToObj('Wrong format')).toEqual(null);
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

  const obj1 = GenDiff.jsonToObj(GenDiff.readFile('__tests__/__fixtures__/before.json'));
  const obj2 = GenDiff.jsonToObj(GenDiff.readFile('__tests__/__fixtures__/after.json'));
  expect(GenDiff.compare(obj1, obj2)).toBe(expected);
});
