import { equalTest, readInputFile } from "../libs/lib"
import { SimpleCpu } from "./SimpleCpu";

const exampleSmallTests = () => {
  console.log('==== exampleSmallTests start ====');
  const input = readInputFile('./examplesmall.txt');
  const cpu = new SimpleCpu();
  equalTest('Cycle 0', cpu.registerXValueDuringCycle(0), 1);
  equalTest('Signal strength 0', cpu.signalStrength(0), 0);
  input.forEach(line => {
    cpu.executeInstructionLine(line);
  });
  equalTest('Cycle 1', cpu.registerXValueDuringCycle(1), 1);
  equalTest('Signal strength 1', cpu.signalStrength(1), 1);
  equalTest('Cycle 2', cpu.registerXValueDuringCycle(2), 1);
  equalTest('Cycle 3', cpu.registerXValueDuringCycle(3), 1);
  equalTest('Cycle 4', cpu.registerXValueDuringCycle(4), 4);
  equalTest('Cycle 5', cpu.registerXValueDuringCycle(5), 4);
  equalTest('Cycle 6', cpu.registerXValueDuringCycle(6), -1);
  equalTest('Cycle 7', cpu.registerXValueDuringCycle(7), -1);
  console.log('==== exampleSmallTests end ====');
}

exampleSmallTests();

const exampleLargeTests = () => {
  console.log('==== exampleLargeTests start ====');
  const input = readInputFile('./examplelarge.txt');
  const cpu = new SimpleCpu();
  input.forEach(line => {
    cpu.executeInstructionLine(line);
  });
  equalTest('Cycle 20', cpu.registerXValueDuringCycle(20), 21);
  equalTest('Signal strength 20', cpu.signalStrength(20), 420);
  equalTest('Signal strength 60', cpu.signalStrength(60), 1140);
  equalTest('Signal strength 140', cpu.signalStrength(140), 2940);
  equalTest('Signal strength 180', cpu.signalStrength(180), 2880);
  equalTest('Signal strength 220', cpu.signalStrength(220), 3960);
  console.log('==== exampleLargeTests end ====');
}

exampleLargeTests();

//sum of six signal strengths
const question1 = () => {
  const input = readInputFile('./input.txt');
  const cpu = new SimpleCpu();
  input.forEach(line => {
    cpu.executeInstructionLine(line);
  });
  let sum = 0;
  for (let c = 20; c <= 220; c += 40) {
    sum += cpu.signalStrength(c);
  }
  console.log('Answer 1:', sum);
}

question1();

const exampleLargeRender = () => {
  console.log('==== exampleLargeRender start ====');
  const input = readInputFile('./examplelarge.txt');
  const cpu = new SimpleCpu();
  input.forEach(line => {
    cpu.executeInstructionLine(line);
  });
  const screen = cpu.renderScreen();
  equalTest('Line 1', screen[0], '##..##..##..##..##..##..##..##..##..##..');
  equalTest('Line 2', screen[1], '###...###...###...###...###...###...###.');
  equalTest('Line 3', screen[2], '####....####....####....####....####....');
  equalTest('Line 4', screen[3], '#####.....#####.....#####.....#####.....');
  equalTest('Line 5', screen[4], '######......######......######......####');
  equalTest('Line 6', screen[5], '#######.......#######.......#######.....');
  console.log('==== exampleLargeRender end ====');
}

exampleLargeRender();

//render the screen and recognize the letters
const question2 = () => {
  const input = readInputFile('./input.txt');
  const cpu = new SimpleCpu();
  input.forEach(line => {
    cpu.executeInstructionLine(line);
  });
  const screen = cpu.renderScreen();
  console.log('Answer 2 screen rendered');
  screen.forEach(line => console.log(line));
}

question2();