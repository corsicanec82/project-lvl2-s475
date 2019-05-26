import fs from 'fs';
import genDiff from '../src';

const pathToTestData = '__tests__/__fixtures__/';

test.each`
  firstFileName    | secondFileName  | format     | fileNameExpected
  ${'before.json'} | ${'after.json'} | ${'tree'}  | ${'json-tree.result'}
  ${'before.yml'}  | ${'after.yml'}  | ${'tree'}  | ${'json-tree.result'}
  ${'before.ini'}  | ${'after.ini'}  | ${'tree'}  | ${'ini-tree.result'}
  ${'before.json'} | ${'after.json'} | ${'plain'} | ${'json-plain.result'}
  ${'before.yml'}  | ${'after.yml'}  | ${'plain'} | ${'json-plain.result'}
  ${'before.ini'}  | ${'after.ini'}  | ${'plain'} | ${'ini-plain.result'}
  ${'before.json'} | ${'after.json'} | ${'json'}  | ${'json-json.result'}
  ${'before.yml'}  | ${'after.yml'}  | ${'json'}  | ${'json-json.result'}
  ${'before.ini'}  | ${'after.ini'}  | ${'json'}  | ${'ini-json.result'}
`('compare $firstFileName and $secondFileName, output format - $format', ({
  firstFileName, secondFileName, format, fileNameExpected,
}) => {
  const firstPathToFile = `${pathToTestData}${firstFileName}`;
  const secondPathToFile = `${pathToTestData}${secondFileName}`;
  const expected = fs.readFileSync(`${pathToTestData}${fileNameExpected}`, 'utf8');
  expect(genDiff(firstPathToFile, secondPathToFile, format)).toBe(expected);
});
