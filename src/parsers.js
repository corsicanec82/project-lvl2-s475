import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

export const readFile = (pathToFile) => {
  const format = path.extname(pathToFile).replace('.', '');
  const content = fs.readFileSync(pathToFile, 'utf8');
  return { format, content };
};

const parsers = new Map();

export const addParser = (fileExtension, parser) => {
  parsers[fileExtension] = parser;
};

export const parse = data => parsers[data.format](data.content);

addParser('json', JSON.parse);
addParser('yml', yaml.safeLoad);
addParser('ini', ini.decode);
