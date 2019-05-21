import tree from './tree';
import plain from './plain';

const formatters = new Map();

const addFormatter = (format, func) => {
  formatters[format] = func;
};

const getFormatter = format => formatters[format];

addFormatter('tree', tree);
addFormatter('plain', plain);
addFormatter('json', JSON.stringify);

export default getFormatter;
