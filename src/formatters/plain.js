const showComplexValue = value => (
  value instanceof Object ? '[complex value]' : value
);

const plain = (diff, parent = []) => diff
  .map((node) => {
    if (node.type === 'changed') {
      return plain(node.children, [...parent, node.key]);
    }
    const str = `Property '${[...parent, node.key].join('.')}'`;
    if (node.type === 'removed') {
      return `${str} was removed`;
    }
    if (node.type === 'added') {
      return `${str} was added with value: '${showComplexValue(node.newValue)}'`;
    }
    if (node.type === 'updated') {
      return `${str} was updated. From '${showComplexValue(node.oldValue)}' to '${showComplexValue(node.newValue)}'`;
    }
    return '';
  }).filter(el => el !== '').join('\n');

export default plain;
