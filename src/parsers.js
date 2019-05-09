import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const readFile = (pathToFile) => {
  const format = path.extname(pathToFile).replace('.', '');
  const content = fs.readFileSync(pathToFile, 'utf8');
  return { format, content };
};

const parsers = {
  json: JSON.parse,
  yml: yaml.safeLoad,
  ini: ini.decode,
};

const parse = data => parsers[data.format](data.content);

export { readFile, parse };
