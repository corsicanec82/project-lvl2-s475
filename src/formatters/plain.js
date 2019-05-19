import _ from 'lodash';

const getStatus = (status) => {
  switch (status) {
    case 'added':
      return 'was added with value: ';
    case 'removed':
      return 'was removed';
    case 'updated':
      return 'was updated. From ';
    default:
      return '';
  }
};

const showComplexValue = value => (
  value instanceof Object ? '[complex value]' : value
);

const plain = (diff, parent = []) => diff
  .reduce((acc, obj) => {
    if (_.has(obj, 'children')) {
      return `${acc}${plain(obj.children, [...parent, obj.key])}`;
    }
    const updateProperty = _.has(obj, 'updateValue')
      ? ` to '${showComplexValue(obj.updateValue, 0, true)}'`
      : '';
    const value = obj.status === 'removed'
      ? ''
      : `'${showComplexValue(obj.value, 0, true)}'`;
    const property = obj.status !== 'unchanged'
      ? `Property '${[...parent, obj.key].join('.')}' ${getStatus(obj.status)}${value}${updateProperty}\n`
      : '';
    return `${acc}${property}`;
  }, '');

export default plain;
