import _ from 'lodash';
import { readFile, parse } from './parsers';

const compare = (obj1, obj2) => {
  const ast1 = Object.entries(obj1)
    .reduce((acc, [key, value]) => {
      if (!_.has(obj2, key)) {
        return { ...acc, [`- ${key}`]: value };
      }
      if (_.isEqual(value, obj2[key])) {
        return { ...acc, [`  ${key}`]: value };
      }
      if (_.isPlainObject(value) && _.isPlainObject(obj2[key])) {
        return { ...acc, [`  ${key}`]: compare(value, obj2[key]) };
      }
      return { ...acc, [`- ${key}`]: value, [`+ ${key}`]: obj2[key] };
    }, {});

  const ast2 = Object.keys(obj2)
    .filter(key => !_.has(obj1, key))
    .reduce((acc, key) => ({ ...acc, [`+ ${key}`]: obj2[key] }), {});

  return { ...ast1, ...ast2 };
};

const render = (ast, depth = 0) => {
  const str = Object.entries(ast)
    .reduce((acc, [key, value]) => {
      // let valueIn;
      // if (Array.isArray(value)) {
      //   valueIn = value.map(el =>)
      // }
      const valueIn = _.isPlainObject(value) ? render(value, depth + 4) : value;
      return `${acc}${_.repeat(' ', depth + 2)}${key}: ${valueIn}\n`;
    }, '');

  return `{\n${str}${_.repeat(' ', depth)}}`;
};

export default (firstPathToFile, secondPathToFile) => {
  try {
    const firstObj = parse(readFile(firstPathToFile));
    const secondObj = parse(readFile(secondPathToFile));
    const ast = compare(firstObj, secondObj);
    console.log(ast);
    console.log(render(ast));
  } catch (e) {
    console.error(`${e.name}: ${e.message}`);
  }
  return true;
};
