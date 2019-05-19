import tree from './tree';
import plain from './plain';

const formatters = new Map();

export const addFormatter = (format, func) => {
  formatters[format] = func;
};

export const getFormatter = format => formatters[format];

addFormatter('tree', tree);
addFormatter('plain', plain);
