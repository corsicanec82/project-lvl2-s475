const showComplexValue = value => (
  value instanceof Object ? '[complex value]' : value
);

const plain = (diff, ancestry = []) => diff
  .map((node) => {
    const str = `Property '${[...ancestry, node.key].join('.')}'`;
    switch (node.type) {
      case 'changed':
        return plain(node.children, [...ancestry, node.key]);
      case 'removed':
        return `${str} was removed`;
      case 'added':
        return `${str} was added with value: '${showComplexValue(node.newValue)}'`;
      case 'updated':
        return `${str} was updated. From '${showComplexValue(node.oldValue)}' to '${showComplexValue(node.newValue)}'`;
      case 'unchanged':
        return null;
      default:
        throw new RangeError('(node.type): Invalid value: Only valid value is changed, removed, added, updated, unchanged');
    }
  }).filter(el => el !== null).join('\n');

export default plain;
