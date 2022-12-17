import fs from 'fs';

export const readInputFile = (filename: string) => {
  return fs.readFileSync(filename).toString().split("\n");
}

export const equalTest = (tstMsg: string, inp1: any, inp2: any) => {
  if (inp1 === inp2) {
    console.log(tstMsg + ': passed');
  } else {
    console.log(tstMsg + `: FAILED, got ${inp1}, expected ${inp2}`);
  }
}

export class FifoQueue<T> {
  data: Array<T> = [];
  
  add(element: T) {
    this.data.push(element)
  }

  pop() {
    return this.data.shift();
  }

  isEmpty() {
    return this.data.length === 0
  }

}