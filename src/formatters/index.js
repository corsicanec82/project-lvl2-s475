import _ from 'lodash';

const formatters = new Map();

export const addFormatter = (format, func) => {
  if (!formatters.has(format)) {
    formatters[format] = func;
  }
};

export const getFormatter = format => formatters[format];

export const stringify = (value, indent, inline = false) => {
  const arrayToString = arr => arr.map(el => stringify(el, indent, true)).join(', ');
  const objectToString = obj => Object.entries(obj)
    .map(([k, v]) => `${' '.repeat(indent + 4)}${k}: ${v}`)
    .join('\n');
  const objectToStringInline = obj => Object.entries(obj)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');

  if (_.isArray(value)) {
    return `[${arrayToString(value)}]`;
  }

  if (_.isPlainObject(value)) {
    const strFromObj = inline ? objectToStringInline(value) : objectToString(value);
    return inline
      ? `{ ${strFromObj} }`
      : `{\n${strFromObj}\n${' '.repeat(indent)}}`;
  }

  return value;
};
