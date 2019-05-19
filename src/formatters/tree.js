import _ from 'lodash';

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

const stringify = (value, indent, inline = false) => {
  const arrayToString = arr => arr.map(el => stringify(el, indent, true)).join(', ');
  const objectToString = obj => Object.entries(obj)
    .map(([k, v]) => `${' '.repeat(indent + 4)}${k}: ${v}`)
    .join('\n');
  const objectToStringInline = obj => Object.entries(obj)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  if (_.isArray(value)) {
    return `[${arrayToString(value)}]`;
  }

  if (_.isPlainObject(value)) {
    return inline
      ? `{ ${objectToStringInline(value)} }`
      : `{\n${objectToString(value)}\n${' '.repeat(indent)}}`;
  }

  return value;
};

const tree = (diff, indent = 0) => {
  const el = diff.reduce((acc, obj) => {
    const value = _.has(obj, 'children')
      ? tree(obj.children, indent + 4)
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
