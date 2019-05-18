import _ from 'lodash';
import { stringify } from '.';

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

const plain = (diff, parent = []) => diff
  .reduce((acc, obj) => {
    if (obj.children) {
      return `${acc}${plain(obj.value, [...parent, obj.key])}`;
    }
    const updateProperty = _.has(obj, 'updateValue')
      ? ` to '${stringify(obj.updateValue, 0, true)}'`
      : '';
    const value = obj.status === 'removed'
      ? ''
      : `'${stringify(obj.value, 0, true)}'`;
    const property = obj.status !== 'unchanged'
      ? `Property '${[...parent, obj.key].join('.')}' ${getStatus(obj.status)}${value}${updateProperty}\n`
      : '';
    return `${acc}${property}`;
  }, '');

export default plain;
