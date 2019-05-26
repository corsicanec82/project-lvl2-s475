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
  const list = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${' '.repeat(indent + 2)}+ ${node.key}: ${stringify(node.newValue, indent + 4)}`;
      case 'removed':
        return `${' '.repeat(indent + 2)}- ${node.key}: ${stringify(node.oldValue, indent + 4)}`;
      case 'changed':
        return `${' '.repeat(indent + 2)}  ${node.key}: ${tree(node.children, indent + 4)}`;
      case 'unchanged':
        return `${' '.repeat(indent + 2)}  ${node.key}: ${stringify(node.oldValue, indent + 4)}`;
      case 'updated':
        return [
          `${' '.repeat(indent + 2)}- ${node.key}: ${stringify(node.oldValue, indent + 4)}`,
          `${' '.repeat(indent + 2)}+ ${node.key}: ${stringify(node.newValue, indent + 4)}`,
        ];
      default:
        throw new RangeError('(node.type): Invalid value: Only valid value is changed, removed, added, updated, unchanged');
    }
  });

  return `{\n${_.flatten(list).join('\n')}\n${' '.repeat(indent)}}`;
};

export default tree;
