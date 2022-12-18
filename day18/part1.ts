import { equalTest, readInputFile } from "../libs/lib";
import { Space } from "./Space"

const basicTests = () => {
  const spc = new Space(3,4,5);
  const dims = spc.getDimensions();
  equalTest('dimX', dims.x, 3);
  equalTest('dimY', dims.y, 4);
  equalTest('dimZ', dims.z, 5);
  equalTest('0,0,0 is empty',spc.filled(0,0,0),false);
  equalTest('2,2,2 is empty',spc.filled(2,2,2),false);
  equalTest('3,3,3 is undefined',spc.filled(3,3,3),undefined);
  spc.fill(1,2,3);
  equalTest('1,2,3 is filled now',spc.filled(1,2,3), true);
  spc.fill(4,4,4);
  equalTest('4,4,4 remains undefined',spc.filled(4,4,4), undefined);
}

basicTests();

const processInput = (input: string[]): Space => {
  let maxX = 0; let maxY = 0; let maxZ = 0;
  input.forEach(line => {
    const [x,y,z] = line.split(',').map(e => parseInt(e));
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  })
  const spc = new Space(maxX + 1, maxY + 1, maxZ + 1);
  input.forEach(line => {
    const [x,y,z] = line.split(',').map(e => parseInt(e));
    spc.fill(x,y,z);
  })
  return spc;
}

const example1Tests = () => {
  const input = readInputFile('./example1.txt');
  const spc = processInput(input);
  const dim = spc.getDimensions();
  equalTest('dimX example1', dim.x, 3)
  equalTest('dimY example1', dim.y, 2)
  equalTest('dimZ example1', dim.z, 2)
  equalTest('1,1,1 filled example1', spc.filled(1,1,1), true)
  equalTest('2,1,1 filled example1', spc.filled(2,1,1), true)
  equalTest('0,0,0 not filled example1', spc.filled(0,0,0), false)
  equalTest('surface example1', spc.surfaceArea(), 10)
}

example1Tests()

const example2Tests = () => {
  const input = readInputFile('./example2.txt');
  const spc = processInput(input);
  const dim = spc.getDimensions();
  equalTest('dimX example2', dim.x, 4)
  equalTest('dimY example2', dim.y, 4)
  equalTest('dimZ example2', dim.z, 7)
  equalTest('surface example2', spc.surfaceArea(), 64)
}

example2Tests()

const question1 = () => {
  const input = readInputFile('./input.txt');
  const spc = processInput(input);
  console.log('Answer 1:', spc.surfaceArea());
}

question1();