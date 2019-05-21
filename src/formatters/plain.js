const showComplexValue = value => (
  value instanceof Object ? '[complex value]' : value
);

const plain = (diff, parent = []) => diff
  .map((node) => {
    const str = `Property '${[...parent, node.key].join('.')}'`;
    switch (node.type) {
      case 'changed':
        return plain(node.children, [...parent, node.key]);
      case 'removed':
        return `${str} was removed`;
      case 'added':
        return `${str} was added with value: '${showComplexValue(node.newValue)}'`;
      case 'updated':
        return `${str} was updated. From '${showComplexValue(node.oldValue)}' to '${showComplexValue(node.newValue)}'`;
      default:
        return '';
    }
  }).filter(el => el !== '').join('\n');

export default plain;
