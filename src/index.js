import _ from 'lodash';
import { readFile, parse } from './parsers';

const compare = (obj1, obj2) => {
  const result1 = Object.entries(obj1)
    .reduce((acc, [key, value]) => {
      if (!_.has(obj2, key)) {
        return [...acc, { key, value, status: '-' }];
      }
      if (value !== obj2[key]) {
        return [
          ...acc,
          { key, value, status: '-' },
          { key, value: obj2[key], status: '+' },
        ];
      }
      return [...acc, { key, value, status: ' ' }];
    }, []);

  const result2 = Object.keys(obj2)
    .filter(key => !_.has(obj1, key))
    .map(key => ({ key, value: obj2[key], status: '+' }));

  return [...result1, ...result2]
    .map(({ key, value, status }) => `${status} ${key}: ${value}`)
    .join('\n');
};

export default (firstPathToFile, secondPathToFile) => {
  try {
    const firstObj = parse(readFile(firstPathToFile));
    const secondObj = parse(readFile(secondPathToFile));
    const result = compare(firstObj, secondObj);
    console.log(result);
  } catch (e) {
    console.error(`${e.name}: ${e.message}`);
  }
  return true;
};
