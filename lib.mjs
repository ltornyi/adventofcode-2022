import fs from 'fs';

export const readInputFile = (filename) => {
  return fs.readFileSync(filename).toString().split("\n");
}