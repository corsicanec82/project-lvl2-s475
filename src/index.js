import fs from 'fs';
import _ from 'lodash';

const libName = 'gendiff';

const readFile = (path) => {
  try {
    const stats = fs.statSync(path);
    if (!stats.isFile()) {
      const errIsFile = new Error();
      errIsFile.code = 'EISDIR';
      errIsFile.path = path;
      throw errIsFile;
    }
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    switch (err.code) {
      case 'EISDIR':
        console.error(`${libName}: ${err.path}: Is a directory`);
        break;
      case 'ENOENT':
        console.error(`${libName}: ${err.path}: No such file`);
        break;
      default:
        console.error(err);
        break;
    }
  }
  return null;
};

const jsonToObj = (json) => {
  try {
    return JSON.parse(json);
  } catch (err) {
    console.error(`${libName}: Incorrect JSON file`);
  }
  return null;
};

const compare = (obj1, obj2) => {
  const result1 = Object.entries(obj1)
    .reduce((acc, [key, value]) => {
      if (_.has(obj2, key)) {
        if (value === obj2[key]) {
          return [...acc, { key, value, status: ' ' }];
        }
        return [
          ...acc,
          { key, value, status: '-' },
          { key, value: obj2[key], status: '+' },
        ];
      }
      return [...acc, { key, value, status: '-' }];
    }, []);

  const result2 = Object.keys(obj2)
    .filter(key => !_.has(obj1, key))
    .map(key => ({ key, value: obj2[key], status: '+' }));

  return [...result1, ...result2]
    .map(({ key, value, status }) => `${status} ${key}: ${value}`)
    .join('\n');
};

export default (firstFilePath, secondFilePath) => {
  const firstFileStr = readFile(firstFilePath);
  const secondFileStr = readFile(secondFilePath);
  if (firstFileStr === null || !secondFileStr === null) {
    return;
  }

  const firstObj = jsonToObj(firstFileStr);
  const secondObj = jsonToObj(secondFileStr);
  if (firstObj === null || secondObj === null) {
    return;
  }

  const result = compare(firstObj, secondObj);
  console.log(result);
};

export { readFile, jsonToObj, compare };
