import { equalTest, readInputFile } from "../libs/lib";
import { Element, ElementSpace } from "./ElementSpace";

const basicTests = () => {
  const spc = new ElementSpace(3,4,5, Element.AIR);
  equalTest('0,0,0 is AIR',spc.contains({x:0,y:0,z:0}),Element.AIR);
  equalTest('2,2,2 is AIR',spc.contains({x:2,y:2,z:2}),Element.AIR);
  equalTest('3,3,3 is undefined',spc.contains({x:3,y:3,z:3}),undefined);
  const p123 = {x:1,y:2,z:3}
  spc.fill(p123,Element.LAVA);
  equalTest('1,2,3 is LAVA now',spc.contains(p123), Element.LAVA);
  const p444 = {x:4,y:4,z:4}
  spc.fill(p444,Element.LAVA);
  equalTest('4,4,4 remains undefined',spc.contains(p444), undefined);
}

basicTests();

const processInput = (input: string[]): ElementSpace => {
  let maxX = 0; let maxY = 0; let maxZ = 0;
  input.forEach(line => {
    const [x,y,z] = line.split(',').map(e => parseInt(e));
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  })
  const spc = new ElementSpace(maxX + 2, maxY + 2, maxZ + 2, Element.AIR);
  input.forEach(line => {
    const [x,y,z] = line.split(',').map(e => parseInt(e));
    spc.fill({x,y,z},Element.LAVA);
  })
  return spc;
}

const example1Tests = () => {
  const input = readInputFile('./example1.txt');
  const spc = processInput(input);
  equalTest('1,1,1 LAVA example1', spc.contains({x:1,y:1,z:1}), Element.LAVA)
  equalTest('2,1,1 LAVA example1', spc.contains({x:2,y:1,z:1}), Element.LAVA)
  equalTest('0,0,0 AIR example1', spc.contains({x:0,y:0,z:0}), Element.AIR)
  equalTest('surface example1', spc.surfaceArea(), 10)
  spc.floodFillWater(0,0,0)
  equalTest('external surface example1', spc.externalSurfaceArea(), 10)
}

example1Tests()

const example2Tests = () => {
  const input = readInputFile('./example2.txt');
  const spc = processInput(input);
  equalTest('surface example2', spc.surfaceArea(), 64)
  spc.floodFillWater(0,0,0)
  equalTest('external surface example2', spc.externalSurfaceArea(), 58)
}

example2Tests()

const question1 = () => {
  const input = readInputFile('./input.txt');
  const spc = processInput(input);
  console.log('Answer 1:', spc.surfaceArea());
}

question1();

const question2 = () => {
  const input = readInputFile('./input.txt');
  const spc = processInput(input);
  spc.floodFillWater(0,0,0);
  console.log('Answer 2:', spc.externalSurfaceArea());
}

question2();