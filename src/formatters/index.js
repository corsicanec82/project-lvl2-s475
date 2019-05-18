import tree from './tree';
import plain from './plain';

const formatters = new Map();

export const addFormatter = (format, func) => {
  if (!formatters.has(format)) {
    formatters[format] = func;
  }
};

addFormatter('tree', tree);
addFormatter('plain', plain);

export const getFormatter = format => formatters[format];
