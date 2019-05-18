import fs from 'fs';
import path from 'path';

export const readFile = (pathToFile) => {
  const format = path.extname(pathToFile).replace('.', '');
  const content = fs.readFileSync(pathToFile, 'utf8');
  return { format, content };
};

const parsers = new Map();

export const addParser = (fileExtension, parser) => {
  if (!parsers.has(fileExtension)) {
    parsers[fileExtension] = parser;
  }
};

export const parse = data => parsers[data.format](data.content);
