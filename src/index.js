import _ from 'lodash';
import { readFile, parse } from './parsers';

const rebuildKeys = (el) => {
  if (Array.isArray(el)) {
    return el.map(rebuildKeys);
  }
  if (!_.isPlainObject(el)) {
    return el;
  }

  return Object.entries(el)
    .reduce((acc, [key, value]) => ({ ...acc, [`  ${key}`]: rebuildKeys(value) }), {});
};

const getCompareResult = (object1, object2) => {
  const ast1 = Object.entries(object1)
    .reduce((acc, [key, value]) => {
      if (!_.has(object2, key)) {
        return { ...acc, [`- ${key}`]: rebuildKeys(value) };
      }
      if (_.isEqual(value, object2[key])) {
        return { ...acc, [`  ${key}`]: rebuildKeys(value) };
      }
      if (_.isPlainObject(value) && _.isPlainObject(object2[key])) {
        return { ...acc, [`  ${key}`]: getCompareResult(value, object2[key]) };
      }
      return { ...acc, [`- ${key}`]: rebuildKeys(value), [`+ ${key}`]: rebuildKeys(object2[key]) };
    }, {});

  const ast2 = Object.keys(object2)
    .filter(key => !_.has(object1, key))
    .reduce((acc, key) => ({ ...acc, [`+ ${key}`]: rebuildKeys(object2[key]) }), {});

  return { ...ast1, ...ast2 };
};

const render = (ast, depth = 0, inline = '\n') => {
  if (Array.isArray(ast)) {
    return `[${ast.map(el => render(el, -2, '')).join(', ')}]`;
  }
  if (!_.isPlainObject(ast)) {
    return ast;
  }

  const str = Object.entries(ast)
    .reduce((acc, [key, value]) => {
      const newValue = _.isPlainObject(value) ? render(value, depth + 4) : render(value);
      return `${acc}${_.repeat(' ', depth + 2)}${key}: ${newValue}${inline}`;
    }, '');

  return `{${inline}${str}${_.repeat(' ', depth)}}`;
};

export default (firstPathToFile, secondPathToFile) => {
  try {
    const firstObj = parse(readFile(firstPathToFile));
    const secondObj = parse(readFile(secondPathToFile));
    const ast = getCompareResult(firstObj, secondObj);
    console.log(render(ast));
  } catch (e) {
    console.error(`${e.name}: ${e.message}`);
  }
};
