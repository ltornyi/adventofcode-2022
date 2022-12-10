import { readInputFile } from "../libs/lib.mjs";

const getNumberOfStacks = (crateInput) => {
  const stackLine = crateInput
    .filter(line => line.startsWith(' 1 '))[0]
  const numberOfStacks = parseInt(stackLine.trimRight().split(' ').slice(-1));
  return numberOfStacks;
}

const processCrateLine = (line, numberOfStacks, stacks) => {
  for (let stackNum=0; stackNum < numberOfStacks; stackNum++) {
    const crate = line.substring(stackNum * 4, stackNum * 4 + 4);
    if (crate && crate.trim() !== '')
      stacks[stackNum].push(crate);
  }
}

const processCrateInput = (crateInput) => {
  const numberOfStacks = getNumberOfStacks(crateInput);

  const stacks = [];
  for (let stackNum=0; stackNum < numberOfStacks; stackNum++) {
    stacks.push([])
  }

  //skip last line
  for (let i=0; i < crateInput.length - 1; i++) {
    const line = crateInput[i];
    processCrateLine(line, numberOfStacks, stacks);
  }

  return stacks;
}

const topCrateString = (stacks) => {
  let topString = '';
  stacks.forEach(stack => {
    if (stack && stack.length > 0 )
      topString += stack[0][1]
  })
  return topString;
}

const parseMoveLine = (moveLine) => {
  //move XXX from QQ to PP
  const tokens = moveLine.split(' ');
  return {
    numberOfCrates: parseInt(tokens[1]),
    fromStack: parseInt(tokens[3]),
    toStack: parseInt(tokens[5]),
  }
}

const doTheMoving = (move, stacks) => {
  for (let i=0; i < move.numberOfCrates; i++) {
    const crate = stacks[move.fromStack - 1][0];
    stacks[move.fromStack - 1] = stacks[move.fromStack - 1].slice(1);
    stacks[move.toStack - 1] = [crate, ...stacks[move.toStack - 1]];
  }
}

const processMove = (moveLine, stacks) => {
  const move = parseMoveLine(moveLine);
  doTheMoving(move, stacks);
}

const input = readInputFile('./05input.txt');

const separatorLineIndex = input.indexOf('');
const crateInput = input.slice(0, separatorLineIndex);
const moveInput = input.slice(separatorLineIndex + 1);

const question1 = () => {
  const stacks = processCrateInput(crateInput);
  moveInput.forEach(moveLine => processMove(moveLine, stacks))
  console.log(topCrateString(stacks));
}

const doTheNewMoving = (move, stacks) => {
  const crates = stacks[move.fromStack - 1].slice(0, move.numberOfCrates);
  stacks[move.fromStack - 1] = stacks[move.fromStack - 1].slice(move.numberOfCrates);
  stacks[move.toStack - 1] = [...crates, ...stacks[move.toStack - 1]];
}

const processNewMove = (moveLine, stacks) => {
  const move = parseMoveLine(moveLine);
  doTheNewMoving(move, stacks);
}

const question2 = () => {
  const stacks = processCrateInput(crateInput);
  moveInput.forEach(moveLine => processNewMove(moveLine, stacks))
  console.log(topCrateString(stacks));
}

question1();
question2();