import fs from 'fs';

export const readInputFile = (filename) => {
  return fs.readFileSync(filename).toString().split("\n");
}

export const equalTest = (tstMsg, inp1, inp2) => {
  if (inp1 === inp2) {
    console.log(tstMsg + ': passed');
  } else {
    console.log(tstMsg + `: FAILED, expected ${inp1}, got ${inp2}`);
  }
}