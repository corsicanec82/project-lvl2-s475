import tree from './tree';
import plain from './plain';

const formatters = {
  tree,
  plain,
  json: JSON.stringify,
};

export default format => formatters[format];
