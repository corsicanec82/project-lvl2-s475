import _ from 'lodash';
import yaml from 'js-yaml';
import ini from 'ini';
import { readFile, parse, addParser } from './parsers';
import { addFormatter, getFormatter } from './formatters';
import tree from './formatters/tree';
import plain from './formatters/plain';

addParser('json', JSON.parse);
addParser('yml', yaml.safeLoad);
addParser('ini', ini.decode);

addFormatter('tree', tree);
addFormatter('plain', plain);

const genDiff = (data1, data2) => {
  const part1 = Object.entries(data1)
    .map(([key, value]) => {
      const element = {
        key, value, children: false, status: 'unchanged',
      };
      if (!_.has(data2, key)) {
        return { ...element, status: 'removed' };
      }
      if (_.isEqual(value, data2[key])) {
        return element;
      }
      if (_.isPlainObject(value) && _.isPlainObject(data2[key])) {
        return { ...element, value: genDiff(value, data2[key]), children: true };
      }
      return { ...element, status: 'updated', updateValue: data2[key] };
    });

  const part2 = Object.keys(data2)
    .filter(key => !_.has(data1, key))
    .map(key => (
      {
        key, value: data2[key], status: 'added', children: false,
      }
    ));

  return [...part1, ...part2];
};

const render = (diff, format) => getFormatter(format)(diff);

export default (pathToFile1, pathToFile2, format) => {
  try {
    const data1 = parse(readFile(pathToFile1));
    const data2 = parse(readFile(pathToFile2));
    const diff = genDiff(data1, data2);
    return render(diff, format);
  } catch (e) {
    return `${e.name}: ${e.message}`;
  }
};

export { addParser, addFormatter };
