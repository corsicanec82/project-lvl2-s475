import yaml from 'js-yaml';
import ini from 'ini';

const parsers = new Map();

const addParser = (fileExtension, parser) => {
  parsers[fileExtension] = parser;
};

const parse = data => parsers[data.format](data.content);

addParser('json', JSON.parse);
addParser('yml', yaml.safeLoad);
addParser('ini', ini.decode);

export default parse;
