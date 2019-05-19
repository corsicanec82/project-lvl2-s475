import _ from 'lodash';

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
  const list = diff.reduce((acc, node) => {
    if (node.type === 'added') {
      return `${acc}${' '.repeat(indent + 2)}+ ${node.key}: ${stringify(node.newValue, indent + 4)}\n`;
    }
    if (node.type === 'removed') {
      return `${acc}${' '.repeat(indent + 2)}- ${node.key}: ${stringify(node.oldValue, indent + 4)}\n`;
    }
    if (node.type === 'changed') {
      return `${acc}${' '.repeat(indent + 2)}  ${node.key}: ${tree(node.children, indent + 4)}\n`;
    }
    if (node.type === 'unchanged') {
      return `${acc}${' '.repeat(indent + 2)}  ${node.key}: ${stringify(node.oldValue, indent + 4)}\n`;
    }
    return [
      `${acc}`,
      `${' '.repeat(indent + 2)}- ${node.key}: ${stringify(node.oldValue, indent + 4)}\n`,
      `${' '.repeat(indent + 2)}+ ${node.key}: ${stringify(node.newValue, indent + 4)}\n`,
    ].join('');
  }, '');

  return `{\n${list}${' '.repeat(indent)}}`;
};

export default tree;
