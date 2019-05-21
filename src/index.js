import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parsers';
import getFormatter from './formatters';

const readFile = (pathToFile) => {
  const format = path.extname(pathToFile).replace('.', '');
  const content = fs.readFileSync(pathToFile, 'utf8');
  return { format, content };
};

const node = (type, key, oldValue, newValue = null, children = null) => ({
  type, key, oldValue, newValue, children,
});

const genDiff = (data1, data2) => (
  _.union(Object.keys(data1), Object.keys(data2))
    .map((key) => {
      if (!_.has(data2, key)) {
        return node('removed', key, data1[key]);
      }
      if (!_.has(data1, key)) {
        return node('added', key, null, data2[key]);
      }
      if (_.isEqual(data1[key], data2[key])) {
        return node('unchanged', key, data1[key], data2[key]);
      }
      if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
        return node('changed', key, data1[key], data2[key], genDiff(data1[key], data2[key]));
      }
      return node('updated', key, data1[key], data2[key]);
    })
);

const render = (diff, format) => getFormatter(format)(diff);

export default (pathToFile1, pathToFile2, format) => {
  const data1 = parse(readFile(pathToFile1));
  const data2 = parse(readFile(pathToFile2));
  const diff = genDiff(data1, data2);
  return render(diff, format);
};
