import _ from 'lodash';
import { readFile, parse, addParser } from './parsers';
import { addFormatter, getFormatter } from './formatters';

const node = (type, key, oldValue, newValue, children) => ({
  type, key, oldValue, newValue, children,
});

const genDiff = (data1, data2) => {
  const part1 = Object.entries(data1)
    .map(([key, value]) => {
      if (!_.has(data2, key)) {
        return node('removed', key, value, null, null);
      }
      if (_.isEqual(value, data2[key])) {
        return node('unchanged', key, value, value, null);
      }
      if (_.isPlainObject(value) && _.isPlainObject(data2[key])) {
        return node('changed', key, value, data2[key], genDiff(value, data2[key]));
      }
      return node('updated', key, value, data2[key], null);
    });

  const part2 = Object.keys(data2)
    .filter(key => !_.has(data1, key))
    .map(key => node('added', key, null, data2[key], null));

  return [...part1, ...part2];
};

// const genDiff = (data1, data2) => {
//   const part1 = Object.entries(data1)
//     .map(([key, value]) => {
//       const element = { key, value, status: 'unchanged' };
//       if (!_.has(data2, key)) {
//         return { ...element, status: 'removed' };
//       }
//       if (_.isEqual(value, data2[key])) {
//         return element;
//       }
//       if (_.isPlainObject(value) && _.isPlainObject(data2[key])) {
//         return { ...element, children: genDiff(value, data2[key]), status: 'changed' };
//       }
//       return { ...element, status: 'updated', updateValue: data2[key] };
//     });

//   const part2 = Object.keys(data2)
//     .filter(key => !_.has(data1, key))
//     .map(key => ({ key, value: data2[key], status: 'added' }));

//   return [...part1, ...part2];
// };

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
