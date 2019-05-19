import _ from 'lodash';

const showComplexValue = value => (
  value instanceof Object ? '[complex value]' : value
);

const plain = (diff, parent = []) => diff
  .map((obj) => {
    if (_.has(obj, 'children')) {
      return plain(obj.children, [...parent, obj.key]);
    }
    const str = `Property '${[...parent, obj.key].join('.')}'`;
    if (obj.status === 'removed') {
      return `${str} was removed`;
    }
    if (obj.status === 'added') {
      return `${str} was added with value: '${showComplexValue(obj.value)}'`;
    }
    if (obj.status === 'updated') {
      return `${str} was updated. From '${showComplexValue(obj.value)}' to '${showComplexValue(obj.updateValue)}'`;
    }
    return null;
  }).filter(el => el !== null).join('\n');

export default plain;
