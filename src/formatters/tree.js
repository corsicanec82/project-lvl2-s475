import _ from 'lodash';
import { stringify } from '.';

const getStatus = (status) => {
  switch (status) {
    case 'added':
      return '+';
    case 'removed':
      return '-';
    case 'updated':
      return '-';
    default:
      return ' ';
  }
};

const tree = (diff, indent = 0) => {
  const el = diff.reduce((acc, obj) => {
    const value = obj.children
      ? tree(obj.value, indent + 4)
      : stringify(obj.value, indent + 4);
    const property = `${' '.repeat(indent + 2)}${getStatus(obj.status)} ${obj.key}: ${value}`;
    const updatedProperty = _.has(obj, 'updateValue')
      ? `${' '.repeat(indent + 2)}+ ${obj.key}: ${stringify(obj.updateValue, indent + 4)}\n`
      : '';
    return `${acc}${property}\n${updatedProperty}`;
  }, '');

  return `{\n${el}${' '.repeat(indent)}}`;
};

export default tree;
